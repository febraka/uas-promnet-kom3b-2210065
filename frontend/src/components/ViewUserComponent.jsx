import React, { Component } from "react";
import UserService from "../services/UserService";

class ViewUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      user: {},
    };
  }

  componentDidMount() {
    UserService.getUserById(this.state.id).then((res) => {
      this.setState({ user: res.data });
    });
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="card col-md-6 offset-md-3">
          <h3 className="card-header text-center bg-primary text-white">
            View Inventory Details
          </h3>
          <div className="card-body">
            <div className="mb-3">
              <strong> Nama Peminjam: </strong>
              <p className="mb-0"> {this.state.user.nama_peminjam}</p>
            </div>
            <div className="mb-3">
              <strong> Judul Buku: </strong>
              <p className="mb-0"> {this.state.user.judul}</p>
            </div>
            <div className="mb-3">
              <strong> Jumlah: </strong>
              <p className="mb-0"> {this.state.user.jumlah}</p>
            </div>
            <div className="mb-3">
              <strong> Alamat Peminjam: </strong>
              <p className="mb-0"> {this.state.user.alamat_peminjam}</p>
            </div>
            <div className="mb-3">
              <strong> No HP Peminjam: </strong>
              <p className="mb-0"> {this.state.user.no_hp_peminjam}</p>
            </div>
            <div className="mb-3">
              <strong> Tanggal Pinjam: </strong>
              <p className="mb-0"> {this.state.user.tanggal_pinjam}</p>
            </div>
            <div className="mb-3">
              <strong> Tanggal Kembali: </strong>
              <p className="mb-0"> {this.state.user.tanggal_kembali}</p>
            </div>
            <div className="mb-3">
              <strong> Lama Pinjam: </strong>
              <p className="mb-0"> {this.state.user.lama_pinjam}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewUserComponent;
