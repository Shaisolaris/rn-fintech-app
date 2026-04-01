import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import { colors, spacing, fontSize, borderRadius } from "../../theme/index.js";
import type { PortfolioPoint, TimeRange } from "../../types/index.js";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CHART_WIDTH = SCREEN_WIDTH - spacing.md * 2;
const CHART_HEIGHT = 200;
const TIME_RANGES: TimeRange[] = ["1D", "1W", "1M", "3M", "1Y", "ALL"];

interface Props {
  data: PortfolioPoint[];
  selectedRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
}

function buildPath(data: PortfolioPoint[], width: number, height: number): { line: string; fill: string } {
  if (data.length < 2) return { line: "", fill: "" };

  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((d.value - min) / range) * (height - 20) - 10,
  }));

  const linePoints = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const fillPoints = `${linePoints} L ${width} ${height} L 0 ${height} Z`;

  return { line: linePoints, fill: fillPoints };
}

export function PortfolioChart({ data, selectedRange, onRangeChange }: Props) {
  const sliceMap: Record<TimeRange, number> = { "1D": 1, "1W": 7, "1M": 30, "3M": 90, "1Y": 365, ALL: data.length };
  const sliced = data.slice(-(sliceMap[selectedRange] || data.length));
  const { line, fill } = buildPath(sliced, CHART_WIDTH, CHART_HEIGHT);
  const isPositive = sliced.length >= 2 && sliced[sliced.length - 1]!.value >= sliced[0]!.value;
  const chartColor = isPositive ? colors.positive : colors.negative;

  return (
    <View style={styles.container}>
      <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={chartColor} stopOpacity={0.3} />
            <Stop offset="1" stopColor={chartColor} stopOpacity={0} />
          </LinearGradient>
        </Defs>
        {fill && <Path d={fill} fill="url(#grad)" />}
        {line && <Path d={line} fill="none" stroke={chartColor} strokeWidth={2} />}
      </Svg>

      <View style={styles.ranges}>
        {TIME_RANGES.map((range) => (
          <TouchableOpacity
            key={range}
            onPress={() => onRangeChange(range)}
            style={[styles.rangeBtn, selectedRange === range && styles.rangeBtnActive]}
          >
            <Text style={[styles.rangeText, selectedRange === range && styles.rangeTextActive]}>{range}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: spacing.md },
  ranges: { flexDirection: "row", justifyContent: "space-around", marginTop: spacing.md },
  rangeBtn: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.full },
  rangeBtnActive: { backgroundColor: colors.primary },
  rangeText: { fontSize: fontSize.sm, color: colors.textMuted, fontWeight: "600" },
  rangeTextActive: { color: colors.text },
});
