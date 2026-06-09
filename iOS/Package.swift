// swift-tools-version: 6.0
import PackageDescription

let package = Package(
    name: "NKUI",
    platforms: [
        .iOS(.v17),
        .macOS(.v14)
    ],
    products: [
        .library(name: "NKUI", targets: ["NKUI"]),
    ],
    targets: [
        .target(name: "NKUI"),
        .testTarget(name: "NKUITests", dependencies: ["NKUI"]),
    ]
)
