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
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5 from "@amcharts/amcharts5";

export abstract class XYChartController extends ChartController {

    protected readonly timeRange: "1h"|"24h"|"ytd" = "24h"
    protected series: am5xy.ColumnSeries|null = null

    //
    // Protected
    //

    protected constructor(readonly valueXField: string, readonly valueYField: string) {
        super()
    }

    //
    // ChartController
    //

    protected setup(root: am5.Root): void {
        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        const chart = am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            paddingLeft: 0
        })
        root.container.children.push(chart);


        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        const cursor = am5xy.XYCursor.new(root, {
            behavior: "zoomX"
        })
        cursor.lineY.set("visible", false);
        chart.set("cursor", cursor);


        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        const xAxis = am5xy.DateAxis.new(root, {
            maxDeviation: 0,
            baseInterval: {
//                timeUnit: XYChartController.makeTimeUnit(this.timeRange),
                timeUnit: "day",
                count: 1
            },
            renderer: am5xy.AxisRendererX.new(root, {
                minorGridEnabled:true,
                minorLabelsEnabled:true
            }),
            // tooltip: am5.Tooltip.new(root, {})
        })
        //
        // xAxis.set("minorDateFormats", {
        //     "day":"dd",
        //     "month":"MM"
        // });
        chart.xAxes.push(xAxis);

        const yAxis = am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {}),
            logarithmic: true
        })
        chart.yAxes.push(yAxis);


        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        this.series = am5xy.ColumnSeries.new(root, {
            name: "Series",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: this.valueYField,
            valueXField: this.valueXField,
            tooltip: am5.Tooltip.new(root, {
                labelText: "{valueY}"
            })
        })
        this.series.columns.template.setAll({ strokeOpacity: 0 })
        chart.series.push(this.series);

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

    protected populate(data: unknown[] | null): void {
        this.series?.data.setAll(data ?? [])
    }

    //
    // Private
    //

    // private static makeTimeUnit(timeRange: "1h"|"24h"|"ytd"): am5.time.TimeUnit {
    //     let result: am5.time.TimeUnit
    //     switch(timeRange) {
    //         default:
    //         case "1h":
    //             result = "minute"
    //             break
    //         case "24h":
    //             result = "hour"
    //             break
    //         case "ytd":
    //             result = "month"
    //             break
    //     }
    //     return result
    // }


}