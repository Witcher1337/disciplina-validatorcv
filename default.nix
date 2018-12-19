{ witnessUrl ? null
, pkgs ? import ./pkgs.nix}:

pkgs.callPackage ./release.nix {
  inherit witnessUrl;
}
