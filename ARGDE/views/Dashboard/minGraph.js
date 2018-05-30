 <script src="//cdn.jsdelivr.net/d3js/3.5.17/d3.min.js" charset="utf-8"></script>
  <script src="//cdn.jsdelivr.net/npm/taucharts@1/build/production/tauCharts.min.js" type="text/javascript"></script>
  <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/taucharts@1/build/production/tauCharts.min.css">

  
<style>

    body,
    #line {
    height: 100%
    }

    .color-us {
    stroke: blue
    }

    .color-bug {
    stroke: red
    }

</style>
<script>

  var defData = [{
  type: 'us',
  count: 0,
  date: '12-2013'
}, {
  type: 'us',
  count: 10,
  date: '01-2014'
}, {
  type: 'bug',
  count: 15,
  date: '02-2014'
}, {
  type: 'bug',
  count: 12,
  date: '03-2014'
}, {
  type: 'us',
  count: 16,
  date: '04-2014'
}, {
  type: 'us',
  count: 13,
  date: '05-2014'
}, {
  type: 'bug',
  count: 21,
  date: '01-2014'
}, {
  type: 'bug',
  count: 19,
  date: '02-2014'
}, {
  type: 'bug',
  count: 23,
  date: '03-2014'
}, {
  type: 'bug',
  count: 26,
  date: '04-2014'
}, {
  type: 'bug',
  count: 23,
  date: '05-2014'
}, {
  type: 'us',
  count: 10,
  date: '06-2014'
}, {
  type: 'us',
  count: 15,
  date: '07-2014'
}, {
  type: 'us',
  count: 18,
  date: '08-2014'
}, {
  type: 'us',
  count: 27,
  date: '09-2014'
}, {
  type: 'us',
  count: 29,
  date: '10-2014'
}, {
  type: 'bug',
  count: 65,
  date: '11-2014'
}, {
  type: 'us',
  count: 43,
  date: '12-2014'
}, {
  type: 'bug',
  count: 11,
  date: '01-2015'
}, {
  type: 'us',
  count: 32,
  date: '02-2015'
}, {
  type: 'us',
  count: 47,
  date: '03-2015'
}, {
  type: 'bug',
  count: 86,
  date: '04-2015'
}, {
  type: 'bug',
  count: 76,
  date: '05-2015'
}, {
  type: 'bug',
  count: 32,
  date: '06-2015'
}, {
  type: 'us',
  count: 56,
  date: '07-2015'
}, {
  type: 'bug',
  count: 67,
  date: '08-2015'
}, {
  type: 'us',
  count: 76,
  date: '09-2015'
}, {
  type: 'us',
  count: 53,
  date: '10-2015'
}, {
  type: 'bug',
  count: 21,
  date: '11-2015'
}, {
  type: 'us',
  count: 12,
  date: '12-2015'
}, {
  type: 'bug',
  count: 67,
  date: '01-2016'
}, {
  type: 'us',
  count: 10,
  date: '02-2016'
}, {
  type: 'bug',
  count: 61,
  date: '03-2016'
}, {
  type: 'us',
  count: 69,
  date: '04-2016'
}, {
  type: 'us',
  count: 32,
  date: '05-2016'
}, {
  type: 'us',
  count: 38,
  date: '06-2016'
}, {
  type: 'bug',
  count: 43,
  date: '07-2016'
}, {
  type: 'bug',
  count: 21,
  date: '08-2016'
}, {
  type: 'bug',
  count: 29,
  date: '09-2016'
}, {
  type: 'bug',
  count: 29,
  date: '10-2016'
}, {
  type: 'bug',
  count: 20,
  date: '11-2016'
}, {
  type: 'us',
  count: 11,
  date: '12-2016'
}];


  var chart = new tauCharts.Chart({
  guide: {
    padding: {
      l: 70,
      t: 10,
      b: 70,
      r: 10
    },
    showGridLines: 'xy',
    color: {
      brewer: {
        us: 'color-us',
        bug: 'color-bug'
      }
    },
    y: {
      label: {
        text: 'Count of completed entities',
        padding: 50
      }
    },
    x: {
      label: 'Month'
    }
  },
  data: defData,
  type: 'line',
  x: 'date',
  y: 'count',
  color: 'type'
});

chart.renderTo('#body');

</script>