{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  # Packages available in the shell environment
  buildInputs = [
    pkgs.corepack_22
    pkgs.nodejs_22
    pkgs.git
  ];

  # Environment variables for the shell
  shellHook = ''
    echo "Welcome to your Nix development environment!"
    # You can add custom commands here that run when entering the shell
  '';
}
