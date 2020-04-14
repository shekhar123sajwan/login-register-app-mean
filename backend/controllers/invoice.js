// module.exports.findAll = (req, res) => {
//     console.log(req);
//     res.send('NOT IMPLEMENTED: Author delete GET');
// };

async function findAll(req, res, next) {
    console.log(req);
    setTimeout(() => {
        console.log('you are just calling findall method');
    }, 3000);
    console.log('test');
}

module.exports = { findAll };
