/**
 * Created by root on 28/10/17.
 */
const excel = require('node-excel-export');

const styles = {
    headerDark: {
        fill: {
            fgColor: {
                rgb: 'e0ebeb'
            }
        },
        font: {
            color: {
                rgb: '527a7a'
            },
            sz: 12,
            bold: true,
            underline: true
        }
    },
    cellPink: {
        fill: {
            fgColor: {
                rgb: 'FFFFCCFF'
            }
        }
    },
    cellGreen: {
        fill: {
            fgColor: {
                rgb: 'FF00FF00'
            }
        }
    }
};

const heading = [
    [{value: 'Report Description', style: styles.headerDark}],
    ['a2'] // <-- It can be only values
];

function generateExcel(heading, merges, specification, dataset) {
    return excel.buildExport(
        [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
            {
                name: 'Report', // <- Specify sheet name (optional)
                heading: heading, // <- Raw heading array (optional)
                merges: merges, // <- Merge cell ranges
                specification: specification, // <- Report specification
                data: dataset // <-- Report data
            }
        ]
    );
}


exports.excelStyles = styles;
exports.excelHeadings = heading;
exports.generateExcel = generateExcel;