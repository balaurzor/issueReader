var fs = require('fs');

// Configure Angular `github.ts` file path
var targetPath = './src/environments/github.ts';
// `github.ts` file structure
var envConfigFile = `
    export const clientId = '${process.env.GIT_CLIENT_ID}';
    export const clientSecret = '${process.env.GIT_CLIENT_SECRET}';
`;
console.log('The file `github.ts` will be written with the following content: \n');
console.log(envConfigFile);

fs.writeFile(targetPath, envConfigFile, (err) => {
   if (err) {
       throw console.error(err);
   } else {
       console.log(`Angular github.ts file generated correctly at ${targetPath} \n`);
   }
});
