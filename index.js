const M = require('moment')
const _ = require('lodash')
const MomentRange = require('moment-range')
const chalk = require('chalk')

const moment = MomentRange.extendMoment(M)

let year = moment().range('year')

_.forEach(Array.from(year.by('months')), month =>
{
    console.log(_.pad(month.format('MMM'),20, ' '))
    console.log(_.pad('S  M  T  W  Th  F  S ',20,' '))

    let monthRange = month.range('month')
    let days = Array.from((month.range('month').by('days')))
    let firstDay = monthRange.start.day()

    _.chain(days)
        .map(day => 
        {
            let output = day.format('DD')
            if( day.month() == 0 && day.date() == 25)
                {
                   output = chalk.blue(day.format('DD'))
                }
            
            if( day.month() == 8 && day.date() == 10)
                {
                   output = chalk.magenta(day.format('DD'))
                }
            return output
        })
        .tap(days =>
        {
            for(let i = 0; i < firstDay; i++)
                {
                    days.unshift('  ')
                }
        })
        .chunk(7)
        .forEach(week => 
        {
            console.log(week.join(' '))
        })
    .value()
})