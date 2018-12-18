{ pkgs ? import ./pkgs.nix }:

with pkgs;

buildYarnPackage {
  src = constGitIgnore "validatorcv" ./. [];
}
