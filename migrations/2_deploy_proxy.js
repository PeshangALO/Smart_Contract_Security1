const Cats = artifacts.require('Cats'); // this is contract name, not file name.
const Proxy = artifacts.require('Proxy');

module.exports = async function(deployer, network, accounts){
    // deploying the contract. deploying instance.
    // await  because it is a aysinc function.
    const cats = await Cats.new();
    // Proxy constract need a address for the functional contract. In this case it is "cats".
    const proxy = await Proxy.new(cats.address);

    // Take Proxy source code.
    //.at(): truffle function that create instance of Cats contract, but doing that
    // from already exciting deployed contract "proxy"

    // Fooling truffle by saying that we have a dog address lockated at "proxy.address"
    // Set number of cats to 10
    var proxyCat = await Cats.at(proxy.address);
    proxyCat.setNumberOfCats(10);
    // get the number of cats.
    var nrOfCats = await proxyCat.getNumberOFCats();
    //toNumber: to be readable.
    console.log(nrOfCats.toNumber())

    // in this way the data is saved in proxy contrcat and not in functional contract.
}