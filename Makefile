
.PHONY: help
all: help

migrate:
	git clone https://github.com/sygmaprotocol/sygma-substrate-pallets.git migrations/substrate
	git clone https://github.com/sygmaprotocol/sygma-solidity.git migrations/solidity
	cd migrations/substrate/scripts/js/; yarn; node setup.js;
	cd migrations/solidity; CI=true yarn; npx truffle migrate --network test --file ../../cfg/solidity/local.json; npx truffle migrate --network test2 --file ../../cfg/solidity/local.json;
	ts-node tests/init.ts