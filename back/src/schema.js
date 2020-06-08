const { nexusPrismaPlugin } = require('nexus-prisma')
const { idArg, makeSchema, objectType, stringArg, arg } = require('@nexus/schema')

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const path = require('path')

const Note = objectType({
    name: 'Note',
    description: "Note table",
    definition(t) {
        t.model.id()
        t.model.title()
        t.model.content()
        t.model.date()
        t.model.comments({
            pagination: false,
        })
    },
})

const Comment = objectType({
    name: 'Comment',
    description: "Comment table",
    definition(t) {
        t.model.id()
        t.model.content()
        t.model.date()
    },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.list.field('getNotes', {
        type: 'Note',
        async resolve(parent, args, ctx) {
            return await prisma.note.findMany()
        },
    })

    t.field('getNote', {
        type: 'Note',
	args: {
	    id: arg({
		    type: 'Int'
	    })
	},
        async resolve(parent, { id }, ctx) {
            return await prisma.note.findOne({ where: { id: id } })
        },
    })

    t.list.field('getComments', {
        type: 'Comment',
        args: {
            note_id: arg({
                type: 'Int'
            }),
        },
        async resolve(parent, { note_id }, ctx) {
            return await prisma.comment.findMany({ where: { note_id: note_id } })
        },
    })
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('addNote', {
        type: 'Note',
        args: {
            title: arg({
                type: 'String'
            }),
            content: arg({
                type: 'String'
            })
        },
        resolve: async function (parent, { title, content }, ctx, info) {
	    let note = await prisma.note.create({
                data: {
                    title: title,
                    content: content
                }
            })
            return note
        }
    })

    t.field('addComment', {
        type: 'Comment',
        args: {
            content: arg({ type: 'String' }),
            note_id: arg({ type: 'Int' })
        },
        resolve: async function (parent, { content, note_id }, ctx, info) {
            let comment = await prisma.comment.create({
                data: {
                    content: content,
                    Note: {
                        connect: {
                            id: note_id
                        }
                    }
                }
            })
            return comment
        }
    })
  },
})

const schema = makeSchema({
  types: [Query, Mutation, Note, Comment],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: path.join(__dirname, '../schema.graphql'),
    typegen: path.join(__dirname, 'generated/nexus.ts'),
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})

module.exports = {
  schema
}
