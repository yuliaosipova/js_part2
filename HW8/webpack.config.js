const frontend = {
    entry: './front/JSproduct.js',
    output: {
       filename: './front/build.js'
    }
};

const backend = {
    entry: [
        './server.js'
    ],
    output: {
       filename: 'build.js'
    },
    target: 'node',
    externals: ['fs', 'express', 'body-parser']
};

module.exports = [
   frontend,
   backend
];