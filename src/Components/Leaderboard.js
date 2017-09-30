import React, { Component } from 'react'
import './Leaderboard.css'

class Leaderboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: []
        }

        this.sortByRecent = this.sortByRecent.bind(this)
        this.sortByAlltime = this.sortByAlltime.bind(this)
    }

    componentDidMount() {
        fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
            .then((data) => data.json())
            .then((json) => this.setState({ data: json }))
            .catch((err) => console.error(err))
    }

    sortByRecent() {
        const data = this.state.data
        const sortedData = data.sort((a, b) => {
            return parseInt(b.recent, 10) - parseInt(a.recent, 10)
        })

        this.setState({ data: sortedData })
    }

    sortByAlltime() {
        const data = this.state.data
        const sortedData = data.sort((a, b) => {
            return parseInt(b.alltime, 10) - parseInt(a.alltime, 10)
        })

        this.setState({ data: sortedData })
    }

    render() {
        const data = this.state.data

        return <table className="Leaderboard">
            <thead>
                <tr>
                    <td>Rank</td>
                    <td>Username</td>
                    <td className="sort" onClick={ this.sortByRecent }>
                        ▴ Recent score
                    </td>
                    <td className="sort" onClick={ this.sortByAlltime }>
                        ▴ Alltime score
                    </td>
                </tr>
            </thead>
            <tbody>
                { 
                    data.map((camper, index) => {
                        return (
                            <tr key={ index }>
                                <td>{ index + 1 }</td>
                                <td>
                                    <img src={ camper.img } alt="user-avatar" />
                                    { camper.username }
                                </td>
                                <td>{ camper.recent }</td>
                                <td>{ camper.alltime }</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    }
}

export default Leaderboard 
