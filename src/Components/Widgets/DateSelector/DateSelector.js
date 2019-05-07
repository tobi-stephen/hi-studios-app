import React from 'react';
import { Grid, Col, Item, Picker, Icon, } from 'native-base';

const months = {
    0: {label: 'Jan', days: 31}, 1: {label: 'Feb', days: 29}, 2: {label: 'Mar', days: 31}, 
    3: {label: 'Apr', days: 30}, 4: {label: 'May', days: 30}, 5: {label: 'Jun', days: 30}, 
    6: {label: 'Jul', days: 31}, 7: {label: 'Aug', days: 31}, 8: {label: 'Sep', days: 30},
    9: {label: 'Oct', days: 30}, 10: {label: 'Nov', days: 31}, 11: {label: 'Dec', days: 31}
};

class DateSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            day: '',
            month: '',
            year: '',
            days: months[parseInt((new Date()).getMonth())].days,
            d: 0,
        }
    }

    onDateChange(key, value) {
        let d = 0;
        if(key === 'month' && value !== this.state.month) {
            d = +this.state.day;
            //this.setState({d: +this.state.day});
        }
  
        this.setState({
          [key]: value,
        });


        console.log(this.state)
  //console.log(d, months[this.state.month].days, months[this.state.month].label, months[value].days, months[value].label, this.state.month, value);
        if(key === 'month' && value !== this.state.month) {
          const self = this;
          this.setState(prevState => {
              return {days: months[value].days}
          });
          setTimeout(function() {
            //console.log(d, self.state.days, )
            //if(d <= self.state.days)
              //self.setState({day: d});
          }, 100)
        }
    }

    render() {
        let fullYear = parseInt((new Date()).getFullYear()) -18;
        return (
            <Grid>
                <Col>
                <Item picker style={styles.input}>
                <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Day"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.day}
                onValueChange={this.onDateChange.bind(this, 'day')}
                >
                <Picker.Item label="Day" value="" />
                {[...Array(this.state.days)].map( (v, i) => {
                    let day = 1+i;
                    return <Picker.Item key={i} label={`${day}`} value={`${day}`} />
                })}
                </Picker>
                </Item>
                </Col>
                <Col style={{marginLeft: 10,}}>
                <Item picker style={styles.input}>
                <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Month"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.month}
                onValueChange={this.onDateChange.bind(this, 'month')}
                >
                <Picker.Item label="Month" value="" />
                {[...Array(12)].map( (v, i) => {
                    return <Picker.Item key={i} label={`${months[i].label}`} value={`${i}`} />
                })}
                </Picker>
                </Item>
                </Col>
                <Col style={{marginLeft: 10,}}>
                <Item picker style={styles.input}>
                <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{borderWidth: 2, borderStyle: 'solid'}}
                placeholder="Year"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.year}
                onValueChange={this.onDateChange.bind(this, 'year')}
                >
                <Picker.Item label="Year" value="" />
                {[...Array(50)].map( (v, i) => {
                    let year = fullYear--;
                    return <Picker.Item key={i} label={`${year}`} value={`${year}`} />
                })}
                </Picker>
                </Item>
                </Col>
            </Grid>
        )
    }
}

const styles = {
    input: {
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderColor: '#64493c',
        margin: 0,
      },
      dobLabel: {
        borderBottomWidth: 0,
      },
      dobItem: {
        borderWidth: 0,
      },
}

export default DateSelector;