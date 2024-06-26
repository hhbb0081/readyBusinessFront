import { ResponsiveBar } from '@nivo/bar'

export default function Chart ({ data }) {
    return(
    <ResponsiveBar
        data={data}
        keys={[
            '매출',
        ]}
        indexBy="day"
        margin={{ top: 20, right: 10, bottom: 30, left: 40 }}
        padding={0.5}
        width={710}
        height={390}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors="#D82356"
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0,
            // tickValues: [0, 2, 4, 6, 8, 10],
            // format: (value) => `${value.toFixed(1)}`,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="#fff"
        
    />
    )
}