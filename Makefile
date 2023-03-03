
.PHONY: help
all: help

migrate:
	# git clone git@github.com:sygmaprotocol/sygma-substrate-pallets.git migrations/substrate
	# git clone git@github.com:sygmaprotocol/sygma-solidity.git migrations/solidity
	cd migrations/substrate/scripts/js/; yarn; node setup.js;
	cd migrations/solidity; CI=true yarn; npx truffle migrate --network test; npx truffle migrate --network test2;
