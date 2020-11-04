import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Animation } from '@devexpress/dx-react-chart';

const format = () => tick => tick;
const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});
const legendLabelStyles = theme => ({
  label: {
    paddingTop: theme.spacing(1),
    whiteSpace: 'nowrap',
  },
});
const legendItemStyles = () => ({
  item: {
    flexDirection: 'column',
  },
});

const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const legendItemBase = ({ classes, ...restProps }) => (
  <Legend.Item className={classes.item} {...restProps} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
const Item = withStyles(legendItemStyles, { name: 'LegendItem' })(legendItemBase);
const demoStyles = () => ({
  chart: {
    paddingRight: '20px',
  },
  title: {
    whiteSpace: 'pre',
  },
});

const ValueLabel = (props) => {
  const { text } = props;
  return (
    <ValueAxis.Label
      {...props}
      text={`${text}%`}
    />
  );
};

const titleStyles = {
  title: {
    whiteSpace: 'pre',
  },
};
const TitleText = withStyles(titleStyles)(({ classes, ...props }) => (
  <Title.Text {...props} className={classes.title} />
));

class StatisticsSuccess extends React.PureComponent {
  constructor(props) {
    super(props);
    this.calcAchievementRate = this.calcAchievementRate.bind(this);
  }

  calcAchievementRate() {
    let data = this.props.exerciseList;
    const rateMap = new Map();
    let ratePerDate = [];

    data.forEach(element => {
      if(!rateMap.has(element.date)) {
        rateMap.set(element.date, [element.count, element.purposeCount])
      } 
      else {
        let tempData = rateMap.get(element.date);
        rateMap.set(element.date, 
          [element.count+tempData[0], element.purposeCount+tempData[1]])
      }
    });

    rateMap.forEach((value, key) => {
      ratePerDate.push({date: key, rate: (value[0] / value[1]) * 100})
    })

    ratePerDate.sort((x, y) => (x.date > y.date ? 1 : -1));
    
    return ratePerDate;
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper>
        <Chart
          data={this.calcAchievementRate()}
          className={classes.chart}
        >
          {/* <ArgumentAxis tickFormat={format} />
          <ValueAxis
            max={100}
            labelComponent={ValueLabel}
          /> */}
          <ArgumentAxis />
          <ValueAxis
            max={100}
            labelComponent={ValueLabel}
          />
          <LineSeries
            name="rate"
            valueField="rate"
            argumentField="date"
          />
          <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
          <Title
            text='Achivement Per date'
            textComponent={TitleText}
          />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}

export default withStyles(demoStyles, { name: 'StatisticsSuccess' })(StatisticsSuccess);