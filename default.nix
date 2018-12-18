{ witnessUrl ? null, pkgs ? import ./pkgs.nix }:

with pkgs;

buildYarnPackage {
  WITNESS_API_URL = witnessUrl;
  src = constGitIgnore "validatorcv" ./. [];
}
