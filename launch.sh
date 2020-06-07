#!/bin/bash

cd front
npm install
npm run-script build ; mv dist/bundle.js public/
cd -

export FRONT_PID=`cat front.pid`
echo "FRONT_PID = $FRONT_PID"
if [ ! -z $FRONT_PID ]
then
    echo "Front server was started"
    kill $FRONT_PID
fi

cd front
nohup node server.js > ../front.log &
export FRONT_PID=$!
cd -
echo $FRONT_PID > front.pid

cd back
npm install
cd -

export BACK_PID=`cat back.pid`
echo "BACK_PID = $BACK_PID"
if [ ! -z $BACK_PID ]
then
    echo "Back server was started"
    kill $BACK_PID
fi

cd back
nohup npm start > ../back.log &
export BACK_PID=$!
cd -
echo $BACK_PID > back.pid
