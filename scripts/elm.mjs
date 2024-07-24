
import path from 'path';
import elmCompiler from 'node-elm-compiler';
const {compile} = elmCompiler;

export async function fetchDependencies(workingDir, projectPath, options) {
  const useShelm = options.useShelm || false;
  if(useShelm) {
    fetchDependenciesWithShelm(workingDir, projectPath, options);
  }
  const elmJson = await import(`${workingDir}/elm.json`, {assert: {type: 'json'}});
  console.log(elmJson.default);
//   const dependencies = elmJson.dependencies.direct;
//   for (const [name, version] of Object.entries(dependencies)) {
//     await import(`${projectPath}/elm-stuff/packages/${name}/${version}/docs.json`);
//   }
}

function fetchDependenciesWithShelm(workingDir, projectPath, options) {
    console.log("Running fetch with shelm");
}

export function elmMake(sources, options){
    return compile(sources, options);
}

export function make(rootDir, source, target, fetchOptions = {useShelm:false}) {
    if (fetchOptions !== undefined) {
        fetchDependencies(process.cwd(), rootDir, fetchOptions).catch((err) => {
            console.error("Error fetching dependencies: ", err);
        });    
    }
    let makeOptions = {
        cwd: path.join(process.cwd(), rootDir),
        output: target
    };
    console.log("Make Options: ", makeOptions);
    return elmMake([source], makeOptions) // // nosemgrep : path-join-resolve-traversal
}