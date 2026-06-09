import SwiftUI

public enum NKColors {
    // Primary
    public static let primary50 = Color(hex: 0xE3F2FD)
    public static let primary100 = Color(hex: 0xBBDEFB)
    public static let primary200 = Color(hex: 0x90CAF9)
    public static let primary300 = Color(hex: 0x64B5F6)
    public static let primary400 = Color(hex: 0x42A5F5)
    public static let primary500 = Color(hex: 0x2196F3)
    public static let primary600 = Color(hex: 0x1E88E5)
    public static let primary700 = Color(hex: 0x1976D2)
    public static let primary800 = Color(hex: 0x1565C0)
    public static let primary900 = Color(hex: 0x0D47A1)

    // Neutral
    public static let neutral0 = Color(hex: 0xFFFFFF)
    public static let neutral50 = Color(hex: 0xFAFAFA)
    public static let neutral100 = Color(hex: 0xF5F5F5)
    public static let neutral200 = Color(hex: 0xEEEEEE)
    public static let neutral300 = Color(hex: 0xE0E0E0)
    public static let neutral400 = Color(hex: 0xBDBDBD)
    public static let neutral500 = Color(hex: 0x9E9E9E)
    public static let neutral600 = Color(hex: 0x757575)
    public static let neutral700 = Color(hex: 0x616161)
    public static let neutral800 = Color(hex: 0x424242)
    public static let neutral900 = Color(hex: 0x212121)

    // Semantic
    public static let success = Color(hex: 0x4CAF50)
    public static let warning = Color(hex: 0xFF9800)
    public static let error = Color(hex: 0xF44336)
    public static let info = Color(hex: 0x2196F3)
}

extension Color {
    init(hex: UInt32) {
        self.init(
            red: Double((hex >> 16) & 0xFF) / 255,
            green: Double((hex >> 8) & 0xFF) / 255,
            blue: Double(hex & 0xFF) / 255,
            opacity: 1.0
        )
    }
}
