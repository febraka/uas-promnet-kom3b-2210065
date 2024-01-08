import React, { Component } from "react";
import UserService from "../services/UserService";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faSave } from '@fortawesome/free-solid-svg-icons';

class CreateUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      judul: "",
      jumlah: "",
      nama_peminjam: "",
      alamat_peminjam: "",
      no_hp_peminjam: "",
      tanggal_pinjam: "",
      tanggal_kembali: "",
      lama_pinjam: "",
    };

    this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
  }

  componentDidMount() {
    if (this.state.id === "_add") {
      return;
    } else {
      UserService.getUserById(this.state.id).then((res) => {
        let user = res.data;
        this.setState({
          judul: user.judul,
          jumlah: user.jumlah,
          nama_peminjam: user.nama_peminjam,
          alamat_peminjam: user.alamat_peminjam,
          no_hp_peminjam: user.no_hp_peminjam,
          tanggal_pinjam: user.tanggal_pinjam,
          tanggal_kembali: user.tanggal_kembali,
          lama_pinjam: user.lama_pinjam,
        });
      });
    }
  }

  saveOrUpdateUser = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (
      !this.state.judul ||
      !this.state.jumlah ||
      !this.state.nama_peminjam ||
      !this.state.alamat_peminjam ||
      !this.state.no_hp_peminjam ||
      !this.state.tanggal_pinjam ||
      !this.state.tanggal_kembali ||
      !this.state.lama_pinjam
    ) {
      Swal.fire(
        'Eror!',
        'Form Harus Di isi Semua.',
        'error'
      );
      return;
    }

    let user = {
      judul: this.state.judul,
      jumlah: this.state.jumlah,
      nama_peminjam: this.state.nama_peminjam,
      alamat_peminjam: this.state.alamat_peminjam,
      no_hp_peminjam: this.state.no_hp_peminjam,
      tanggal_pinjam: this.state.tanggal_pinjam,
      tanggal_kembali: this.state.tanggal_kembali,
      lama_pinjam: this.state.lama_pinjam,
    };

    if (this.state.id === "_add") {
      UserService.createUser(user).then((res) => {
        this.props.history.push("/users");
        Swal.fire(
          'Sukses!',
          'Inventory berhasil ditambahkan.',
          'success'
        );
      });
    } else {
      UserService.updateUser(user, this.state.id).then((res) => {
        this.props.history.push("/users");
        Swal.fire(
          'Sukses!',
          'Inventory berhasil diperbarui.',
          'success'
        );
      });
    }
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  cancel() {
    this.props.history.push("/users");
  }

  getTitle() {
    return this.state.id === "_add" ? (
      <h3 className="text-center">Add Inventory</h3>
    ) : (
      <h3 className="text-center">Edit Inventory</h3>
    );
  }

  render() {
    return (
      <div>
        <br />
        <div className="container">
          <div className="row">
            <div className="card col-md-12">
              <div className="card-header bg-info text-white">
                {this.getTitle()}
              </div>
              <div className="card-body">
                <div className="row">
                  {/* Left Side */}
                  <div className="col-md-6">
                    <form>
                      <div className="mb-3">
                        <label className="form-label">Judul:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="judul"
                          value={this.state.judul}
                          onChange={this.changeHandler}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Jumlah:</label>
                        <input
                          type="number"
                          className="form-control"
                          name="jumlah"
                          value={this.state.jumlah}
                          onChange={this.changeHandler}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Nama Peminjam:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="nama_peminjam"
                          value={this.state.nama_peminjam}
                          onChange={this.changeHandler}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Alamat Peminjam:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="alamat_peminjam"
                          value={this.state.alamat_peminjam}
                          onChange={this.changeHandler}
                          required
                        />
                      </div>
                    </form>
                  </div>

                  {/* Right Side */}
                  <div className="col-md-6">
                    <form>
                      <div className="mb-3">
                        <label className="form-label">No HP Peminjam:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="no_hp_peminjam"
                          value={this.state.no_hp_peminjam}
                          onChange={this.changeHandler}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Tanggal Pinjam:</label>
                        <input
                          type="date"
                          className="form-control"
                          name="tanggal_pinjam"
                          value={this.state.tanggal_pinjam}
                          onChange={this.changeHandler}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Tanggal Kembali:</label>
                        <input
                          type="date"
                          className="form-control"
                          name="tanggal_kembali"
                          value={this.state.tanggal_kembali}
                          onChange={this.changeHandler}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Lama Pinjam:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lama_pinjam"
                          value={this.state.lama_pinjam}
                          onChange={this.changeHandler}
                          required
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-danger mx-3"
                    onClick={() => this.props.history.push("/users")}
                  >
                    Kembali  <FontAwesomeIcon icon={faCancel} className="me-1" />
                  </button>
                  <button
                    className="btn btn-success mx-3"
                    onClick={this.saveOrUpdateUser}
                  >
                    <FontAwesomeIcon icon={faSave} className="me-1" /> Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUserComponent;
