/*-
 *
 * Hedera Mirror Node Explorer
 *
 * Copyright (C) 2021 - 2024 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import {ChartController} from "@/components/chart/base/ChartController";
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'

export class TPSChartController extends ChartController {

    private readonly timeRange = "24h"

    //
    // ChartController
    //

    protected setup(root: am5.Root): void {
        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        const chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            paddingLeft: 0
        }));


        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
            behavior: "zoomX"
        }));
        cursor.lineY.set("visible", false);


        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        const xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
            maxDeviation: 0,
            baseInterval: {
                timeUnit: TPSChartController.makeTimeUnit(this.timeRange),
                count: 1
            },
            renderer: am5xy.AxisRendererX.new(root, {
                minorGridEnabled:true,
                minorLabelsEnabled:true
            }),
            // tooltip: am5.Tooltip.new(root, {})
        }));
        //
        // xAxis.set("minorDateFormats", {
        //     "day":"dd",
        //     "month":"MM"
        // });

        const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {})
        }));


        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        const series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: "Series",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            valueXField: "time",
            tooltip: am5.Tooltip.new(root, {
                labelText: "{valueY}"
            })
        }));

        series.columns.template.setAll({ strokeOpacity: 0 })
        series.data.setAll(TPSChartController.buildData(this.timeRange));


        // Add scrollbar
        // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
        // chart.set("scrollbarX", am5.Scrollbar.new(root, {
        //     orientation: "horizontal"
        // }));


        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        // series.appear(1000);
        // chart.appear(1000, 100);
    }

    //
    // Private
    //

    private static buildData(timeRange: "1h"|"24h"|"ytd"): TPSData[] {
        const result: TPSData[] = []

        let milliInterval: number
        let valueCount: number
        switch(timeRange) {
            case "1h":
                milliInterval = 60 * 1000 // 1mn
                valueCount = 60
                break
            case "24h":
                milliInterval = 60 * 60 * 1000 // 1h
                valueCount = 24
                break
            case "ytd":
                milliInterval = 60 * 60 * 1000 // 1month
                valueCount = 24
                break
        }

        let t = Date.now()
        for (let i = 0; i < valueCount; i += 1) {
            const value = Math.round(1000 + (Math.random() * 200 - 100));
            t += milliInterval
            result.push({time: t, value})
        }

        return result
    }

    private static makeTimeUnit(timeRange: "1h"|"24h"|"ytd"): am5.time.TimeUnit {
        let result: am5.time.TimeUnit
        switch(timeRange) {
            case "1h":
                result = "minute"
                break
            case "24h":
                result = "hour"
                break
            case "ytd":
                result = "month"
                break
        }
        return result
    }
}

interface TPSData {
    time: number,
    value: number
}