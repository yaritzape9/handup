import React, {useState, useEffect, Component} from 'react';
import NonprofitDataService from '../services/nonprofit.service';
import "../assets/css/searchBar.css";
import CardItem from './CardItem';
import devmission from '../assets/images/devmission.png';
import codeforsanfrancisco from '../assets/images/code4sf.png';
import hackthehood from '../assets/images/hackthehood.png';

function SearchBar(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [q, setQ] = useState("");
    const [searchParam] = useState(["nonprofit_name"]);
    const [filterParam, setFilterParam] = useState(["All"]);
    const [nonprofits, setNonprofits] = useState([]);
    const [sectorArray, setSectorArray] = useState([])
    let tempSectorArray = [];
    let value = false;

    useEffect(() => {
        NonprofitDataService.getAll()
        .then(response => {
            setNonprofits(response.data);
            response.data.forEach((nonprofit) => {
              let nonprofit_id = nonprofit.nonprofit_id;
              NonprofitDataService.getAllSector(nonprofit_id)
              .then(response => {
                setSectorArray([ ...tempSectorArray, ...response.data ])
                tempSectorArray.push(response.data[0]);
                setIsLoaded(true);
                // setItems(response.data);
              })
              .catch(e => {
                setIsLoaded(true);
                setError(e);
                console.log(e)
              })
            }) 
            value = true;
      })
        .catch(e => {
        console.log(e);
        });
    }, [value]);

    const getImage = (param) => {
        param = param.replace(/\s/g, '').toLowerCase()
        if (param === "devmission") return devmission;
        if (param === "codeforsanfrancisco") return codeforsanfrancisco;
        if (param === "hackthehood") return hackthehood;
      }

    function search(items) {
        return sectorArray.filter((item) => {
            if (item.nonprofit_name == filterParam) {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            } else if (filterParam == "All") {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            }
        });
    }

    if (error) {
        return <>{error.message}</>;
    } else if (!isLoaded) {
        return <>loading...</>;
    } else {
        return (
            <div className="container">
                <h1> Search Bar</h1>
                <div className="wrapper">
                    <div className="search-wrapper">
                        <label htmlFor="search-form">
                            <input
                                type="search"
                                name="search-form"
                                id="search-form"
                                className="search-input"
                                placeholder="Search for..."
                                value={q}
                                /*
                                // set the value of our useState q
                                //  anytime the user types in the search box
                                */
                                onChange={(e) => setQ(e.target.value)}
                            />
                            <span className="sr-only">Search countries here</span>
                        </label>
                    </div>
                    {/* <div className='cards__container'> */}
                        <div className='cards__wrapper'>
                            <h3> All Nonprofits </h3>
                        <ul className="card-grid">
                        {search(sectorArray).map((item) => (
                            <ul className='cards__items'>
                            {
                                // console.log(user.nonprofit_name),
                                <CardItem 
                                    src={getImage(item.nonprofit_name)}
                                    name={item.nonprofit_name}
                                    text={item.description}
                                    label={item.sectors.map(function(name,index){return name.sector_name.replace(/['"]+/g, '')} )}
                                    path={`/nonprofits/${item.nonprofit_id}/profile`}
                                    state={item}
                                />                
                            }
                            </ul>
                        ))}
                        </ul>
                    </div>
                </div>
                {/* </div> */}
            </div>
        )
}
}
export default SearchBar;
// class SearchBar extends Component {
//     state = {
//         query: '',
//         data: [],
//         searchString:[]
//     }
    
//     handleInputChange = (event) => {
//         this.setState({
//             query: event.target.value
//             },()=> {
//             this.filterArray();
//         })
    
//     }
    
//     getData = () => {
//         NonprofitDataService.getAll()
//         .then(response => {
//             this.setState({
//                 data: response.data,
//                 searchString:response.data
//             })
//         })
//     }
    
//     filterArray = () => {
//         let searchString = this.state.query;
//         let responseData = this.state.data;
//         let temp = this.state.data
//         if(searchString.length > 0 || responseData.length < 1){
//             // console.log(responseData[i].name);
//             responseData = responseData.filter(function (el) {
//                 if (el.nonprofit_name == searchString) {
//                     console.log(el.nonprofit_name == searchString)
//                     return el 
//                 } else {
//                     console.log("EERERERE")
//                     return temp
//                 }
//             });
//             console.log(responseData)
//             this.setState({
//                 data: responseData
//             })
//         } else {
//             this.setState({
//                 data: temp
//             })
//         }
    
//     }
    
//     componentWillMount() {
//         this.getData();
//     }
//     render() {
//         return (
//             <div className="searchForm">
//                 <form>
//                     <input type="text" id="filter" placeholder="Search for..."  onChange={this.handleInputChange}/>
//                 </form>
//                 <div>
//                     {
//                         this.state.data.map((i) =>
//                             <p>{i.nonprofit_name}</p>
//                         )
//                     }
//                 </div>
//             </div>
//         )
//       }

//     // render() {
//     //     return (
//     //       <div className="searchForm">
//     //         <form>
//     //           <input
//     //             placeholder="Search for..."
//     //             value={this.state.query}
//     //             onChange={this.handleInputChange}
//     //           />
//     //         </form>
//     //         <div>{this.state.data.map(i => <p>{i.nonprofit_name}</p>)}</div>
//     //       </div>
//     //     );
//     //   }
//     }
    