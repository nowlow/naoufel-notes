import io from 'socket.io-client/dist/socket.io'
import config from '../front/config'

let NotesSocket = (function() {
    let instance = null

    return {
        getInstance: () => {
            if (instance !== null)
                return instance
            instance = io(config.back_uri)
            console.log('io on ', config.back_uri)
            return instance
        }
    }
})

export default NotesSocket