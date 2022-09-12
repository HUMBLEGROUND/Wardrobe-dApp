#!/bin/bash

set -e

# don't rewrite paths for Windows Git Bash users


# clean out any old identites in the wallets
rm -rf wallet/*

# launch network; create channel and join peer to channel

pushd ../network

./startnetwork.sh

sleep 100

./createchannel.sh

sleep 100

./setAnchorPeerUpdate.sh

sleep 100

./deployCC.sh

popd