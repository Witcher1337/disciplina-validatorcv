{ witnessUrl ? null
, buildYarnPackage
, parallel
, brotli
, constGitIgnore
}:

buildYarnPackage {
  WITNESS_API_URL = witnessUrl;
  src = constGitIgnore "validatorcv" ./. [];

  buildInputs = [ parallel brotli ];

  postBuild = ''
    find build/ -type f \
      -not -name '*.jpg' \
      -not -name '*.png' \
      -not -name '*.webp' \
      -not -name '*.woff' \
      -not -name '*.woff2' | parallel brotli
  '';

  yarnBuildMore = "yarn build";
  installPhase = "mv build $out";
}
