import React from "react";
import "./style.css";
import ShowData from "./ShowData";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: [],
      Searchval: [],
      CurrentPage: 1,
      DataPerPage: 10,
      NumberOfPages: 0,
      SearchUserID: "",
      SearchId: "",
      Searchtitle: "",
      SearchCompleted: "",
      SearchClass: "",
      UpdateClass: "hidden",
      UpdId: ""
    };
  }

  async componentDidMount() {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    this.setState({ Data: data, Searchval: data });
    this.NumberOfPages();
  }
  //Function change when the New Data Size is Selected....
  SelectChange = e => {
    let abc = parseInt(e.target.value);
    this.setState({ DataPerPage: abc });
    this.NumberOfPages(e);
  };
  //Function to get total pages...
  NumberOfPages = e => {
    if (e) {
      let Pages = Math.ceil(this.state.Data.length / parseInt(e.target.value));
      this.setState({ NumberOfPages: Pages });
    } else {
      let Pages = Math.ceil(this.state.Data.length / this.state.DataPerPage);
      this.setState({ NumberOfPages: Pages });
    }
  };
  //Functions to set the handle change values.....
  handleUserIDChange = e => {
    this.setState({ SearchUserID: e.target.value, Data: this.state.Searchval });
  };
  handleIdChange = e => {
    this.setState({ SearchId: e.target.value, Data: this.state.Searchval });
  };
  handleTitleChange = e => {
    this.setState({ Searchtitle: e.target.value, Data: this.state.Searchval });
  };
  handleCompletedChange = e => {
    this.setState({
      SearchCompleted: e.target.value,
      Data: this.state.Searchval
    });
  };
  //Function calls when the first button clicked.....
  FirstButton = () => {
    let fir = 1;
    this.setState({ CurrentPage: fir });
  };
  //Function calls when the Next button is cliccked.....
  NextButton = () => {
    let next = parseInt(this.state.CurrentPage) + 1;
    this.setState({ CurrentPage: next });
  };
  //Function calls when the Previous button is cliccked.....
  PrevButton = () => {
    let prev = parseInt(this.state.CurrentPage) - 1;
    this.setState({ CurrentPage: prev });
  };
  //Function calls when the Next button is cliccked.....
  LastButton = () => {
    let last = parseInt(this.state.NumberOfPages);
    this.setState({ CurrentPage: last });
  };

  //Function to show data into the Table.....

  OnRandomButton = e => {
    this.setState({ CurrentPage: parseInt(e.target.value) });
  };
  //Function to generate button.....
  Checkandbutton = () => {
    if (this.state.CurrentPage <= 3) {
      let arr = [];
      for (let i = 1; i <= 5 && i <= this.state.NumberOfPages; i++) arr.push(i);
      return arr.map(value => {
        return (
          <button key={value} value={value} onClick={this.OnRandomButton}>
            {value}
          </button>
        );
      });
    } else if (
      this.state.CurrentPage > 3 &&
      this.state.CurrentPage <= this.state.NumberOfPages - 2
    ) {
      let arr = [];
      let curp = this.state.CurrentPage - 2;
      let newp = this.state.CurrentPage + 2;
      for (let i = curp; i <= newp; i++) arr.push(i);
      return arr.map(value => {
        return (
          <button key={value} value={value} onClick={this.OnRandomButton}>
            {value}
          </button>
        );
      });
    } else if (this.state.NumberOfPages <= 5) {
      let arr = [];
      for (let i = 1; i <= this.state.NumberOfPages; i++) arr.push(i);
      return arr.map(value => {
        return (
          <button key={value} value={value} onClick={this.OnRandomButton}>
            {value}
          </button>
        );
      });
    } else if (this.state.CurrentPage >= this.state.NumberOfPages - 2) {
      let arr = [];
      let cur = this.state.NumberOfPages - 5;
      for (let i = cur + 1; i <= this.state.NumberOfPages; i++) arr.push(i);
      return arr.map(value => {
        return (
          <button key={value} value={value} onClick={this.OnRandomButton}>
            {value}
          </button>
        );
      });
    }
  };
  //Function Runs when the Delete Button Click....
  DeleteRecord = e => {
    let Del = confirm(
      `Are you sure you want to delete Data..?  \n UserId:${
        this.state.Data[e.target.value].userId
      } \n ID:${this.state.Data[e.target.value].id} \n title:${
        this.state.Data[e.target.value].title
      } \n Completed:${this.state.Data[e.target.value].completed}.`
    );
    if (Del == true) {
      let newarr = this.state.Data;
      newarr.splice(e.target.value, 1);
      this.setState({ Data: newarr });
    } else {
      alert("Thankyou Very Much");
    }
  };
  //Function Runs when the UpdateButton Click....

  //Function called when the button click event fires....
  SearchData = () => {
    //For All Data.....
    if (
      this.state.SearchUserID.length != 0 &&
      this.state.SearchId.length != 0 &&
      this.state.Searchtitle.length != 0 &&
      this.state.SearchCompleted.length != 0
    ) {
      let Newar = [];
      for (let a = 0; a < this.state.Data.length; a++) {
        if (
          this.state.Data[a].userId == this.state.SearchUserID &&
          this.state.Data[a].id == this.state.SearchId &&
          this.state.Data[a].title == this.state.Searchtitle &&
          String(this.state.Data[a].completed) == this.state.SearchCompleted
        ) {
          Newar.push(this.state.Data[a]);
        }
      }
      this.setState({ Data: Newar });
    }
    //On the userID only....
    else if (this.state.SearchUserID.length != 0) {
      let Newar = [];
      for (let a = 0; a < this.state.Data.length; a++) {
        if (this.state.Data[a].userId == this.state.SearchUserID) {
          Newar.push(this.state.Data[a]);
        }
      }
      this.setState({ Data: Newar });
    }
    //On the ID only....
    else if (this.state.SearchId.length != 0) {
      let Newar = [];
      for (let a = 0; a < this.state.Data.length; a++) {
        if (this.state.Data[a].id == this.state.SearchId) {
          Newar.push(this.state.Data[a]);
        }
      }
      this.setState({ Data: Newar });
    }
    //On the title only....
    else if (this.state.Searchtitle.length != 0) {
      let Newar = [];
      for (let a = 0; a < this.state.Data.length; a++) {
        if (this.state.Data[a].title == this.state.Searchtitle) {
          Newar.push(this.state.Data[a]);
        }
      }
      this.setState({ Data: Newar });
    }
    //On the Completed only....
    else if (this.state.SearchCompleted.length != 0) {
      let Newar = [];
      for (let a = 0; a < this.state.Data.length; a++) {
        if (
          String(this.state.Data[a].completed) == this.state.SearchCompleted
        ) {
          Newar.push(this.state.Data[a]);
        }
      }
      this.setState({ Data: Newar });
    }
    //If everything is empty.....
    else if (
      (((this.state.SearchId.length == 0 && this.state.SearchUserID.length) ==
        0 && this.state.Searchtitle.length) == 0 &&
        this.state.SearchCompleted.length) == 0
    ) {
      alert("Please Select the Proper Length");
    }
  };
  //Update Button Click Event......
  UpdateData = () => {
    //Update Final Data.......
    let NewAr = this.state.Data;
    NewAr[this.state.UpdId].userId = this.state.SearchUserID;
    NewAr[this.state.UpdId].id = this.state.SearchId;
    NewAr[this.state.UpdId].title = this.state.Searchtitle;
    NewAr[this.state.UpdId].completed = this.state.SearchCompleted;

    //RemoveStatus and Value ....
    this.setState({
      SearchUserID: "",
      SearchId: "",
      Searchtitle: "",
      SearchCompleted: "",
      SearchClass: "",
      UpdateClass: "hidden",
      UpdId: "",
      Data: NewAr
    });
  };
  //Function to render the data....
  render() {
    let begin = (this.state.CurrentPage - 1) * this.state.DataPerPage;
    let end = begin + this.state.DataPerPage;
    let temp = this.state.Data;
    let newArr = temp.slice(begin, end);
    return (
      <div>
        <table border="3">
          <thead>
            <tr>
              <th> UserId </th>
              <th> id </th>
              <th> Title </th>
              <th> Completed </th>
              <th> Delete Record </th>
              <th> Update Record </th>
            </tr>
            <tr>
              <th>
                <input
                  type="text"
                  title="Please Enter User ID (optional)"
                  placeholder="Enter User ID"
                  value={this.state.SearchUserID}
                  onChange={this.handleUserIDChange}
                />
              </th>
              <th>
                <input
                  type="text"
                  title="Please Enter the Id"
                  placeholder="Enter ID"
                  value={this.state.SearchId}
                  onChange={this.handleIdChange}
                />
              </th>
              <th>
                <input
                  type="text"
                  title="Enter Title"
                  placeholder="Enter Title"
                  value={this.state.Searchtitle}
                  onChange={this.handleTitleChange}
                />
              </th>
              <th>
                <select
                  placeholder="Select Status"
                  title="Select the Status "
                  value={this.state.SearchCompleted}
                  onChange={this.handleCompletedChange}
                >
                  <option value="">--Select--</option>
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              </th>
              <th>
                <button
                  className={this.state.SearchClass}
                  onClick={this.SearchData}
                >
                  Search Data
                </button>
              </th>
              <th>
                <button
                  className={this.state.UpdateClass}
                  onClick={this.UpdateData}
                >
                  Update
                </button>
              </th>
            </tr>
          </thead>
          <tbody id="Table">
            <ShowData NewArray={newArr} CurrentPage={this.state.CurrentPage} />
          </tbody>
        </table>
        <div className="center">
          <select
            onChange={this.SelectChange}
            title="Data Per Page"
            className="select"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <br />
          <br />
          <br />
          <br />
          <button
            id="First"
            disabled={this.state.CurrentPage === 1 ? "disabled" : ""}
            onClick={this.FirstButton}
          >
            First
          </button>

          <button
            id="Prev"
            disabled={this.state.CurrentPage === 1 ? "disabled" : ""}
            onClick={this.PrevButton}
          >
            Prev
          </button>
          {this.Checkandbutton()}
          <button
            id="Next"
            disabled={
              this.state.CurrentPage === this.state.NumberOfPages
                ? "disabled"
                : ""
            }
            onClick={this.NextButton}
          >
            Next
          </button>
          <button
            id="Last"
            disabled={
              this.state.CurrentPage === this.state.NumberOfPages
                ? "disabled"
                : ""
            }
            onClick={this.LastButton}
          >
            Last
          </button>
        </div>
      </div>
    );
  }
}
export default App;
