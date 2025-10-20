import { ChartOptionsExtraGaugeSplitLine, ChartOptionsExtra, ChartOptionsExtraArcbar, ChartOptionsExtraArea, ChartOptionsExtraBar, ChartOptionsExtraBubble, ChartOptionsExtraColumn, ChartOptionsExtraGauge, ChartOptionsExtraLine, ChartOptionsExtraMarkLine, ChartOptionsExtraMarkLineData, ChartOptionsExtraMix, ChartOptionsExtraMount, ChartOptionsExtraPie, ChartOptionsExtraRadar, ChartOptionsExtraRing, ChartOptionsExtraRose, ChartOptionsExtraScatter, ChartOptionsExtraTooltip, ChartOptionsExtraGaugePointer, ChartOptionsExtraFunnel, ChartOptionsExtraWord, ChartOptionsExtraCandle, ChartOptionsExtraCandleColor, ChartOptionsExtraCandleAverage, ChartOptionsExtraMap, ChartOptionsExtraMixColumn, ChartOptionsExtraMixArea, ChartOptionsExtraMixLine } from "./type"

export function extraColumnInit(e : UTSJSONObject) : ChartOptionsExtraColumn {
	const extra_column = new ChartOptionsExtraColumn();
	if (e['type'] != null) extra_column.type = e.getString('type') as 'group' | 'stack' | 'meter';
	if (e['width'] != null) extra_column.width = e.getNumber('width')!;
	if (e['seriesGap'] != null) extra_column.seriesGap = e.getNumber('seriesGap')!;
	if (e['categoryGap'] != null) extra_column.categoryGap = e.getNumber('categoryGap')!;
	if (e['barBorderCircle'] != null) extra_column.barBorderCircle = e.getBoolean('barBorderCircle')!;
	if (e['barBorderRadius'] != null) extra_column.barBorderRadius = e.getArray('barBorderRadius') as number[];
	if (e['linearType'] != null) extra_column.linearType = e.getString('linearType') as 'none' | 'opacity' | 'custom';
	if (e['linearOpacity'] != null) extra_column.linearOpacity = e.getNumber('linearOpacity')!;
	if (e['customColor'] != null) extra_column.customColor = e.getArray('customColor') as string[];
	if (e['colorStop'] != null) extra_column.colorStop = e.getNumber('colorStop')!;
	if (e['meterBorder'] != null) extra_column.meterBorder = e.getNumber('meterBorder')!;
	if (e['meterFillColor'] != null) extra_column.meterFillColor = e.getString('meterFillColor')!;
	if (e['activeBgColor'] != null) extra_column.activeBgColor = e.getString('activeBgColor')!;
	if (e['activeBgOpacity'] != null) extra_column.activeBgOpacity = e.getNumber('activeBgOpacity')!;
	if (e['labelPosition'] != null) extra_column.labelPosition = e.getString('labelPosition') as 'outside' | 'insideTop' | 'center' | 'bottom';
	return extra_column;
}
export function extraMarkLineDataInit(e : UTSJSONObject) : ChartOptionsExtraMarkLineData {
	const extra_marklinedata = new ChartOptionsExtraMarkLineData();
	if (e['value'] != null) extra_marklinedata.value = e.getNumber('value');
	if (e['labelText'] != null) extra_marklinedata.labelText = e.getString('labelText');
	if (e['lineColor'] != null) extra_marklinedata.lineColor = e.getString('lineColor')!;
	if (e['showLabel'] != null) extra_marklinedata.showLabel = e.getBoolean('showLabel')!;
	if (e['labelAlign'] != null) extra_marklinedata.labelAlign = e.getString('labelAlign') as 'left' | 'right' | 'top' | 'bottom';
	if (e['labelOffsetX'] != null) extra_marklinedata.labelOffsetX = e.getNumber('labelOffsetX')!;
	if (e['labelOffsetY'] != null) extra_marklinedata.labelOffsetY = e.getNumber('labelOffsetY')!;
	if (e['labelPadding'] != null) extra_marklinedata.labelPadding = e.getNumber('labelPadding')!;
	if (e['labelFontSize'] != null) extra_marklinedata.labelFontSize = e.getNumber('labelFontSize')!;
	if (e['labelFontColor'] != null) extra_marklinedata.labelFontColor = e.getString('labelFontColor')!;
	if (e['labelBgColor'] != null) extra_marklinedata.labelBgColor = e.getString('labelBgColor')!;
	if (e['labelBgOpacity'] != null) extra_marklinedata.labelBgOpacity = e.getNumber('labelBgOpacity')!;
	if (e['yAxisIndex'] != null) extra_marklinedata.yAxisIndex = e.getNumber('yAxisIndex')!;
	if (e['y'] != null) extra_marklinedata.y = e.getNumber('y')!;
	return extra_marklinedata;
}

export function extraMarkLineInit(e : UTSJSONObject) : ChartOptionsExtraMarkLine {
	const extra_markline = new ChartOptionsExtraMarkLine();
	if (e['type'] != null) extra_markline.type = e.getString('type') as 'solid' | 'dash';
	if (e['dashLength'] != null) extra_markline.dashLength = e.getNumber('dashLength')!;
	if (e['data'] != null) {
		const markline_data : ChartOptionsExtraMarkLineData[] = []
		const data = e.getArray('data') as UTSJSONObject[]
		data.forEach((item : UTSJSONObject) => {
			markline_data.push(extraMarkLineDataInit(item))
		})
		extra_markline.data = markline_data
	}
	return extra_markline;
}

export function extraTooltipInit(e : UTSJSONObject) : ChartOptionsExtraTooltip {
	const extra_tooltip = new ChartOptionsExtraTooltip();
	if (e['showBox'] != null) extra_tooltip.showBox = e.getBoolean('showBox')!;
	if (e['showArrow'] != null) extra_tooltip.showArrow = e.getBoolean('showArrow')!;
	if (e['showCategory'] != null) extra_tooltip.showCategory = e.getBoolean('showCategory')!;
	if (e['borderWidth'] != null) extra_tooltip.borderWidth = e.getNumber('borderWidth')!;
	if (e['borderRadius'] != null) extra_tooltip.borderRadius = e.getNumber('borderRadius')!;
	if (e['borderColor'] != null) extra_tooltip.borderColor = e.getString('borderColor')!;
	if (e['borderOpacity'] != null) extra_tooltip.borderOpacity = e.getNumber('borderOpacity')!;
	if (e['bgColor'] != null) extra_tooltip.bgColor = e.getString('bgColor')!;
	if (e['bgOpacity'] != null) extra_tooltip.bgOpacity = e.getNumber('bgOpacity')!;
	if (e['gridType'] != null) extra_tooltip.gridType = e.getString('gridType') as 'solid' | 'dash';
	if (e['dashLength'] != null) extra_tooltip.dashLength = e.getNumber('dashLength')!;
	if (e['gridColor'] != null) extra_tooltip.gridColor = e.getString('gridColor')!;
	if (e['boxPadding'] != null) extra_tooltip.boxPadding = e.getNumber('boxPadding')!;
	if (e['fontSize'] != null) extra_tooltip.fontSize = e.getNumber('fontSize')!;
	if (e['lineHeight'] != null) extra_tooltip.lineHeight = e.getNumber('lineHeight')!;
	if (e['fontColor'] != null) extra_tooltip.fontColor = e.getString('fontColor')!;
	if (e['legendShow'] != null) extra_tooltip.legendShow = e.getBoolean('legendShow')!;
	if (e['legendShape'] != null) extra_tooltip.legendShape = e.getString('legendShape') as 'auto' | 'diamond' | 'circle' | 'triangle' | 'square' | 'rect' | 'line';
	if (e['splitLine'] != null) extra_tooltip.splitLine = e.getBoolean('splitLine')!;
	if (e['horizentalLine'] != null) extra_tooltip.horizentalLine = e.getBoolean('horizentalLine')!;
	if (e['xAxisLabel'] != null) extra_tooltip.xAxisLabel = e.getBoolean('xAxisLabel')!;
	if (e['yAxisLabel'] != null) extra_tooltip.yAxisLabel = e.getBoolean('yAxisLabel')!;
	if (e['labelBgColor'] != null) extra_tooltip.labelBgColor = e.getString('labelBgColor')!;
	if (e['labelBgOpacity'] != null) extra_tooltip.labelBgOpacity = e.getNumber('labelBgOpacity')!;
	if (e['labelFontColor'] != null) extra_tooltip.labelFontColor = e.getString('labelFontColor')!;
	return extra_tooltip;
}

export function extraMountInit(e : UTSJSONObject) : ChartOptionsExtraMount {
	const extra_mount = new ChartOptionsExtraMount();
	if (e['type'] != null) extra_mount.type = e.getString('type') as 'mount' | 'sharp' | 'triangle' | 'bar';
	if (e['widthRatio'] != null) extra_mount.widthRatio = e.getNumber('widthRatio')!;
	if (e['borderWidth'] != null) extra_mount.borderWidth = e.getNumber('borderWidth')!;
	if (e['barBorderCircle'] != null) extra_mount.barBorderCircle = e.getBoolean('barBorderCircle')!;
	if (e['barBorderRadius'] != null) extra_mount.barBorderRadius = e.getArray('barBorderRadius') as number[];
	if (e['linearType'] != null) extra_mount.linearType = e.getString('linearType') as 'none' | 'opacity' | 'custom';
	if (e['linearOpacity'] != null) extra_mount.linearOpacity = e.getNumber('linearOpacity')!;
	if (e['customColor'] != null) extra_mount.customColor = e.getArray('customColor') as string[];
	if (e['colorStop'] != null) extra_mount.colorStop = e.getNumber('colorStop') as number;
	return extra_mount;
}

export function extraBarInit(e : UTSJSONObject) : ChartOptionsExtraBar {
	const extraBar = new ChartOptionsExtraBar();
	if (e['type'] != null) extraBar.type = e.getString('type') as 'group' | 'stack';
	if (e['width'] != null) extraBar.width = e.getNumber('width')!;
	if (e['seriesGap'] != null) extraBar.seriesGap = e.getNumber('seriesGap')!;
	if (e['categoryGap'] != null) extraBar.categoryGap = e.getNumber('categoryGap')!;
	if (e['barBorderCircle'] != null) extraBar.barBorderCircle = e.getBoolean('barBorderCircle')!;
	if (e['barBorderRadius'] != null) extraBar.barBorderRadius = e.getArray('barBorderRadius') as number[];
	if (e['linearType'] != null) extraBar.linearType = e.getString('linearType') as 'none' | 'opacity' | 'custom';
	if (e['linearOpacity'] != null) extraBar.linearOpacity = e.getNumber('linearOpacity')!;
	if (e['customColor'] != null) extraBar.customColor = e.getArray('customColor') as string[];
	if (e['colorStop'] != null) extraBar.colorStop = e.getNumber('colorStop')!;
	if (e['activeBgColor'] != null) extraBar.activeBgColor = e.getString('activeBgColor')!;
	if (e['activeBgOpacity'] != null) extraBar.activeBgOpacity = e.getNumber('activeBgOpacity')!;
	return extraBar;
}
export function extraLineInit(e : UTSJSONObject) : ChartOptionsExtraLine {
	const extraLine = new ChartOptionsExtraLine();
	if (e['type'] != null) extraLine.type = e.getString('type') as 'straight' | 'curve' | 'step';
	if (e['width'] != null) extraLine.width = e.getNumber('width')!;
	if (e['activeType'] != null) extraLine.activeType = e.getString('activeType') as 'none' | 'hollow' | 'solid';
	if (e['linearType'] != null) extraLine.linearType = e.getString('linearType') as 'none' | 'custom';
	if (e['onShadow'] != null) extraLine.onShadow = e.getBoolean('onShadow')!;
	if (e['animation'] != null) extraLine.animation = e.getString('animation') as 'vertical' | 'horizontal';
	return extraLine;
}
export function extraAreaInit(e : UTSJSONObject) : ChartOptionsExtraArea {
	const extraArea = new ChartOptionsExtraArea();
	if (e['type'] != null) extraArea.type = e.getString('type') as 'straight' | 'curve' | 'step';
	if (e['opacity'] != null) extraArea.opacity = e.getNumber('opacity')!;
	if (e['addLine'] != null) extraArea.addLine = e.getBoolean('addLine')!;
	if (e['width'] != null) extraArea.width = e.getNumber('width')!;
	if (e['gradient'] != null) extraArea.gradient = e.getBoolean('gradient')!;
	if (e['activeType'] != null) extraArea.activeType = e.getString('activeType') as 'none' | 'hollow' | 'solid';
	return extraArea;
}

export function extraPieInit(e : UTSJSONObject) : ChartOptionsExtraPie {
	const extraPie = new ChartOptionsExtraPie();
	if (e['activeOpacity'] != null) extraPie.activeOpacity = e.getNumber('activeOpacity')!;
	if (e['activeRadius'] != null) extraPie.activeRadius = e.getNumber('activeRadius')!;
	if (e['offsetAngle'] != null) extraPie.offsetAngle = e.getNumber('offsetAngle')!;
	if (e['customRadius'] != null) extraPie.customRadius = e.getNumber('customRadius')!;
	if (e['labelWidth'] != null) extraPie.labelWidth = e.getNumber('labelWidth')!;
	if (e['border'] != null) extraPie.border = e.getBoolean('border')!;
	if (e['borderWidth'] != null) extraPie.borderWidth = e.getNumber('borderWidth')!;
	if (e['borderColor'] != null) extraPie.borderColor = e.getString('borderColor')!;
	if (e['linearType'] != null) extraPie.linearType = e.getString('linearType') as 'none' | 'custom';
	if (e['customColor'] != null) extraPie.customColor = e.getArray('customColor') as string[];
	return extraPie;
}

export function extraRingInit(e : UTSJSONObject) : ChartOptionsExtraRing {
	const extraRing = new ChartOptionsExtraRing();
	if (e['ringWidth'] != null) extraRing.ringWidth = e.getNumber('ringWidth')!;
	if (e['centerColor'] != null) extraRing.centerColor = e.getString('centerColor')!;
	if (e['activeOpacity'] != null) extraRing.activeOpacity = e.getNumber('activeOpacity')!;
	if (e['activeRadius'] != null) extraRing.activeRadius = e.getNumber('activeRadius')!;
	if (e['offsetAngle'] != null) extraRing.offsetAngle = e.getNumber('offsetAngle');
	if (e['customRadius'] != null) extraRing.customRadius = e.getNumber('customRadius');
	if (e['labelWidth'] != null) extraRing.labelWidth = e.getNumber('labelWidth')!;
	if (e['border'] != null) extraRing.border = e.getBoolean('border')!;
	if (e['borderWidth'] != null) extraRing.borderWidth = e.getNumber('borderWidth')!;
	if (e['borderColor'] != null) extraRing.borderColor = e.getString('borderColor')!;
	if (e['linearType'] != null) extraRing.linearType = e.getString('linearType') as 'none' | 'custom';
	if (e['customColor'] != null) extraRing.customColor = e.getArray('customColor') as string[];
	return extraRing;
}
export function extraRoseInit(e : UTSJSONObject) : ChartOptionsExtraRose {
	const extraRose = new ChartOptionsExtraRose();
	if (e['type'] != null) extraRose.type = e.getString('type') as 'area' | 'radius';
	if (e['minRadius'] != null) extraRose.minRadius = e.getNumber('minRadius');
	if (e['activeOpacity'] != null) extraRose.activeOpacity = e.getNumber('activeOpacity')!;
	if (e['activeRadius'] != null) extraRose.activeRadius = e.getNumber('activeRadius')!;
	if (e['offsetAngle'] != null) extraRose.offsetAngle = e.getNumber('offsetAngle');
	if (e['labelWidth'] != null) extraRose.labelWidth = e.getNumber('labelWidth')!;
	if (e['border'] != null) extraRose.border = e.getBoolean('border')!;
	if (e['borderWidth'] != null) extraRose.borderWidth = e.getNumber('borderWidth')!;
	if (e['borderColor'] != null) extraRose.borderColor = e.getString('borderColor')!;
	if (e['linearType'] != null) extraRose.linearType = e.getString('linearType') as 'none' | 'custom';
	if (e['customColor'] != null) extraRose.customColor = e.getArray('customColor') as string[];
	return extraRose;
}
export function extraScatterInit(e : UTSJSONObject) : ChartOptionsExtraScatter {
	const extraScatter = new ChartOptionsExtraScatter();
	if (e['id'] != null) extraScatter.id = e.getString('id');
	return extraScatter;
}
export function extraBubbleInit(e : UTSJSONObject) : ChartOptionsExtraBubble {
	const extraBubble = new ChartOptionsExtraBubble();
	if (e['border'] != null) extraBubble.border = e.getNumber('border')!;
	if (e['opacity'] != null) extraBubble.opacity = e.getNumber('opacity')!;
	return extraBubble;
}
export function extraMixColumnInit(e : UTSJSONObject) : ChartOptionsExtraMixColumn {
	const extraMixColumn = new ChartOptionsExtraMixColumn();
	if (e['width'] != null) extraMixColumn.width = e.getNumber('width')!;
	if (e['seriesGap'] != null) extraMixColumn.seriesGap = e.getNumber('seriesGap')!;
	if (e['categoryGap'] != null) extraMixColumn.categoryGap = e.getNumber('categoryGap')!;
	if (e['barBorderCircle'] != null) extraMixColumn.barBorderCircle = e.getBoolean('barBorderCircle')!;
	if (e['barBorderRadius'] != null) extraMixColumn.barBorderRadius = e.getArray('barBorderRadius') as number[];
	if (e['linearType'] != null) extraMixColumn.linearType = e.getString('linearType') as 'none' | 'opacity' | 'custom';
	if (e['linearOpacity'] != null) extraMixColumn.linearOpacity = e.getNumber('linearOpacity')!;
	if (e['customColor'] != null) extraMixColumn.customColor = e.getArray('customColor') as string[];
	if (e['colorStop'] != null) extraMixColumn.colorStop = e.getNumber('colorStop')!;
	return extraMixColumn;
}

export function extraMixAreaInit(e : UTSJSONObject) : ChartOptionsExtraMixArea {
	const extraMixArea = new ChartOptionsExtraMixArea();
	if (e['gradient'] != null) extraMixArea.gradient = e.getBoolean('gradient')!;
	if (e['opacity'] != null) extraMixArea.opacity = e.getNumber('opacity')!;
	return extraMixArea;
}

export function extraMixLineInit(e : UTSJSONObject) : ChartOptionsExtraMixLine {
	const extraMixLine = new ChartOptionsExtraMixLine();
	if (e['width'] != null) extraMixLine.width = e.getNumber('width')!;
	return extraMixLine;
}

export function extraMixInit(e : UTSJSONObject) : ChartOptionsExtraMix {
	const extraMix = new ChartOptionsExtraMix()
	if (e['column'] != null) {
		extraMix.column = extraMixColumnInit(e.getJSON('column')!)
	}
	if (e['area'] != null) {
		extraMix.area = extraMixAreaInit(e.getJSON('area')!)
	}
	if (e['line'] != null) {
		extraMix.line = extraMixLineInit(e.getJSON('line')!)
	}
	return extraMix
}
export function extraRadarInit(e : UTSJSONObject) : ChartOptionsExtraRadar {
	const extraRadar = new ChartOptionsExtraRadar();
	if (e['gridType'] != null) extraRadar.gridType = e.getString('gridType') as 'radar' | 'circle';
	if (e['gridColor'] != null) extraRadar.gridColor = e.getString('gridColor')!;
	if (e['gridCount'] != null) extraRadar.gridCount = e.getNumber('gridCount')!;
	if (e['gridEval'] != null) extraRadar.gridEval = e.getNumber('gridEval')!;
	if (e['radius'] != null) extraRadar.radius = e.getNumber('radius')!;
	if (e['axisLabel'] != null) extraRadar.axisLabel = e.getBoolean('axisLabel')!;
	if (e['axisLabelTofix'] != null) extraRadar.axisLabelTofix = e.getNumber('axisLabelTofix')!;
	if (e['labelShow'] != null) extraRadar.labelShow = e.getBoolean('labelShow')!;
	if (e['labelColor'] != null) extraRadar.labelColor = e.getString('labelColor')!;
	if (e['labelPointShow'] != null) extraRadar.labelPointShow = e.getBoolean('labelPointShow')!;
	if (e['labelPointRadius'] != null) extraRadar.labelPointRadius = e.getNumber('labelPointRadius')!;
	if (e['labelPointColor'] != null) extraRadar.labelPointColor = e.getString('labelPointColor')!;
	if (e['opacity'] != null) extraRadar.opacity = e.getNumber('opacity')!;
	if (e['border'] != null) extraRadar.border = e.getBoolean('border')!;
	if (e['borderWidth'] != null) extraRadar.borderWidth = e.getNumber('borderWidth')!;
	if (e['max'] != null) extraRadar.max = e.getNumber('max')!;
	if (e['linearType'] != null) extraRadar.linearType = e.getString('linearType') as 'none' | 'custom';
	if (e['customColor'] != null) extraRadar.customColor = e.getArray('customColor') as string[];
	return extraRadar;
}
export function extraArcbarInit(e : UTSJSONObject) : ChartOptionsExtraArcbar {
	const extraArcbar = new ChartOptionsExtraArcbar();
	if (e['type'] != null) extraArcbar.type = e.getString('type') as 'default' | 'circle';
	if (e['direction'] != null) extraArcbar.direction = e.getString('direction') as 'cw' | 'ccw';
	if (e['width'] != null) extraArcbar.width = e.getNumber('width')!;
	if (e['lineCap'] != null) extraArcbar.lineCap = e.getString('lineCap') as 'round' | 'square' | 'butt';
	if (e['backgroundColor'] != null) extraArcbar.backgroundColor = e.getString('backgroundColor')!;
	if (e['startAngle'] != null) extraArcbar.startAngle = e.getNumber('startAngle')!;
	if (e['endAngle'] != null) extraArcbar.endAngle = e.getNumber('endAngle')!;
	if (e['radius'] != null) extraArcbar.radius = e.getNumber('radius')!;
	if (e['gap'] != null) extraArcbar.gap = e.getNumber('gap')!;
	if (e['centerX'] != null) extraArcbar.centerX = e.getNumber('centerX')!;
	if (e['centerY'] != null) extraArcbar.centerY = e.getNumber('centerY')!;
	if (e['linearType'] != null) extraArcbar.linearType = e.getString('linearType') as 'none' | 'custom';
	if (e['customColor'] != null) extraArcbar.customColor = e.getArray('customColor') as string[];
	return extraArcbar;
}
export function extraGaugePointerInit(e : UTSJSONObject) : ChartOptionsExtraGaugePointer {
	const extraGaugePointer = new ChartOptionsExtraGaugePointer();
	if (e['width'] != null) extraGaugePointer.width = e.getNumber('width')!;
	if (e['color'] != null) extraGaugePointer.color = e.getString('color')!;
	return extraGaugePointer;
}

export function extraGaugeSplitLineInit(e : UTSJSONObject) : ChartOptionsExtraGaugeSplitLine {
	const extraGaugeSplitLine = new ChartOptionsExtraGaugeSplitLine();
	if (e['fixRadius'] != null) extraGaugeSplitLine.fixRadius = e.getNumber('fixRadius')!;
	if (e['splitNumber'] != null) extraGaugeSplitLine.splitNumber = e.getNumber('splitNumber')!;
	if (e['width'] != null) extraGaugeSplitLine.width = e.getNumber('width')!;
	if (e['color'] != null) extraGaugeSplitLine.color = e.getString('color')!;
	if (e['childNumber'] != null) extraGaugeSplitLine.childNumber = e.getNumber('childNumber')!;
	if (e['childWidth'] != null) extraGaugeSplitLine.childWidth = e.getNumber('childWidth')!;
	return extraGaugeSplitLine;
}

export function extraGaugeInit(e : UTSJSONObject) : ChartOptionsExtraGauge {
	const extraGauge = new ChartOptionsExtraGauge();
	if (e['type'] != null) extraGauge.type = e.getString('type')!;
	if (e['width'] != null) extraGauge.width = e.getNumber('width')!;
	if (e['labelColor'] != null) extraGauge.labelColor = e.getString('labelColor')!;
	if (e['labelOffset'] != null) extraGauge.labelOffset = e.getNumber('labelOffset')!;
	if (e['startAngle'] != null) extraGauge.startAngle = e.getNumber('startAngle')!;
	if (e['endAngle'] != null) extraGauge.endAngle = e.getNumber('endAngle')!;
	if (e['startNumber'] != null) extraGauge.startNumber = e.getNumber('startNumber')!;
	if (e['endNumber'] != null) extraGauge.endNumber = e.getNumber('endNumber')!;
	if (e['formatter'] != null) extraGauge.formatter = e.getAny('formatter')!;
	if (e['format'] != null) extraGauge.format = e.getString('format')!;
	if (e['splitLine'] != null) {
		extraGauge.splitLine = extraGaugeSplitLineInit(e.getJSON('splitLine')!)
	}
	if (e['pointer'] != null) {
		extraGauge.pointer = extraGaugePointerInit(e.getJSON('pointer')!)
	}
	return extraGauge;
}

export function extraFunnelInit(e : UTSJSONObject) : ChartOptionsExtraFunnel {
	const extraFunnel = new ChartOptionsExtraFunnel();
	if (e['type'] != null) extraFunnel.type = e.getString('type') as 'funnel' | 'triangle' | 'pyramid';
	if (e['activeOpacity'] != null) extraFunnel.activeOpacity = e.getNumber('activeOpacity')!;
	if (e['activeWidth'] != null) extraFunnel.activeWidth = e.getNumber('activeWidth')!;
	if (e['border'] != null) extraFunnel.border = e.getBoolean('border')!;
	if (e['borderWidth'] != null) extraFunnel.borderWidth = e.getNumber('borderWidth')!;
	if (e['borderColor'] != null) extraFunnel.borderColor = e.getString('borderColor')!;
	if (e['fillOpacity'] != null) extraFunnel.fillOpacity = e.getNumber('fillOpacity')!;
	if (e['minSize'] != null) extraFunnel.minSize = e.getNumber('minSize')!;
	if (e['labelAlign'] != null) extraFunnel.labelAlign = e.getString('labelAlign') as 'right' | 'left';
	if (e['linearType'] != null) extraFunnel.linearType = e.getString('linearType') as 'none' | 'custom';
	if (e['customColor'] != null) extraFunnel.customColor = e.getArray('customColor') as string[];
	return extraFunnel;
}

export function extraWordInit(e : UTSJSONObject) : ChartOptionsExtraWord {
	const extraWord = new ChartOptionsExtraWord();
	if (e['type'] != null) extraWord.type = e.getString('type') as 'normal' | 'vertical';
	if (e['autoColors'] != null) extraWord.autoColors = e.getBoolean('autoColors')!;
	return extraWord;
}
export function extraCandleColorInit(e : UTSJSONObject) : ChartOptionsExtraCandleColor {
	const extraCandleColor = new ChartOptionsExtraCandleColor();
	if (e['upLine'] != null) extraCandleColor.upLine = e.getString('upLine')!;
	if (e['upFill'] != null) extraCandleColor.upFill = e.getString('upFill')!;
	if (e['downLine'] != null) extraCandleColor.downLine = e.getString('downLine')!;
	if (e['downFill'] != null) extraCandleColor.downFill = e.getString('downFill')!;
	return extraCandleColor;
}

export function extraCandleAverageInit(e : UTSJSONObject) : ChartOptionsExtraCandleAverage {
	const extraCandleAverage = new ChartOptionsExtraCandleAverage();
	if (e['show'] != null) extraCandleAverage.show = e.getBoolean('show')!;
	if (e['name'] != null) extraCandleAverage.name = e.getArray('name') as string[];
	if (e['day'] != null) extraCandleAverage.day = e.getArray('day') as number[];
	if (e['color'] != null) extraCandleAverage.color = e.getArray('color') as string[];
	return extraCandleAverage;
}

export function extraCandlelInit(e : UTSJSONObject) : ChartOptionsExtraCandle {
	const extraCandle = new ChartOptionsExtraCandle()
	if (e['color'] != null) {
		extraCandle.color = extraCandleColorInit(e.getJSON('color')!)
	}
	if (e['average'] != null) {
		extraCandle.average = extraCandleAverageInit(e.getJSON('average')!)
	}
	return extraCandle
}

export function extraMapInit(e : UTSJSONObject) : ChartOptionsExtraMap {
	const extraMap = new ChartOptionsExtraMap();
	if (e['border'] != null) extraMap.border = e.getBoolean('border')!;
	if (e['mercator'] != null) extraMap.mercator = e.getBoolean('mercator')!;
	if (e['borderWidth'] != null) extraMap.borderWidth = e.getNumber('borderWidth')!;
	if (e['borderColor'] != null) extraMap.borderColor = e.getString('borderColor')!;
	if (e['fillOpacity'] != null) extraMap.fillOpacity = e.getNumber('fillOpacity')!;
	if (e['active'] != null) extraMap.active = e.getBoolean('active')!;
	if (e['activeTextColor'] != null) extraMap.activeTextColor = e.getString('activeTextColor')!;
	if (e['activeBorderColor'] != null) extraMap.activeBorderColor = e.getString('activeBorderColor')!;
	if (e['activeFillColor'] != null) extraMap.activeFillColor = e.getString('activeFillColor')!;
	if (e['activeFillOpacity'] != null) extraMap.activeFillOpacity = e.getNumber('activeFillOpacity')!;
	return extraMap;
}


export function extraInit(e : UTSJSONObject) : ChartOptionsExtra {
	const extra = new ChartOptionsExtra()
	if (e['column'] != null) {
		extra.column = extraColumnInit(e.getJSON('column')!)
	}
	if (e['markLine'] != null) {
		extra.markLine = extraMarkLineInit(e.getJSON('markLine')!)
	}
	if (e['tooltip'] != null) {
		extra.tooltip = extraTooltipInit(e.getJSON('tooltip')!)
	}
	if (e['mount'] != null) {
		extra.mount = extraMountInit(e.getJSON('mount')!)
	}
	if (e['bar'] != null) {
		extra.bar = extraBarInit(e.getJSON('bar')!)
	}
	if (e['line'] != null) {
		extra.line = extraLineInit(e.getJSON('line')!)
	}
	if (e['area'] != null) {
		extra.area = extraAreaInit(e.getJSON('area')!)
	}
	if (e['pie'] != null) {
		extra.pie = extraPieInit(e.getJSON('pie')!)
	}
	if (e['ring'] != null) {
		extra.ring = extraRingInit(e.getJSON('ring')!)
	}
	if (e['rose'] != null) {
		extra.rose = extraRoseInit(e.getJSON('rose')!)
	}
	if (e['scatter'] != null) {
		extra.scatter = extraScatterInit(e.getJSON('scatter')!)
	}
	if (e['bubble'] != null) {
		extra.bubble = extraBubbleInit(e.getJSON('bubble')!)
	}
	if (e['mix'] != null) {
		extra.mix = extraMixInit(e.getJSON('mix')!)
	}
	if (e['radar'] != null) {
		extra.radar = extraRadarInit(e.getJSON('radar')!)
	}
	if (e['arcbar'] != null) {
		extra.arcbar = extraArcbarInit(e.getJSON('arcbar')!)
	}
	if (e['gauge'] != null) {
		extra.gauge = extraGaugeInit(e.getJSON('gauge')!)
	}
	if (e['funnel'] != null) {
		extra.funnel = extraFunnelInit(e.getJSON('funnel')!)
	}
	if (e['word'] != null) {
		extra.word = extraWordInit(e.getJSON('word')!)
	}
	if (e['candle'] != null) {
		extra.candle = extraCandlelInit(e.getJSON('candle')!)
	}
	if (e['map'] != null) {
		extra.map = extraMapInit(e.getJSON('map')!)
	}
	return extra
}