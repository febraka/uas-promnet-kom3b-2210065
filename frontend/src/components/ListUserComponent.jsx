import React, { Component } from 'react';
import UserService from '../services/UserService';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';

class ListUserComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            searchTerm: '',
        };

        this.addUser = this.addUser.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.getFilteredUsers = this.getFilteredUsers.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.viewUser = this.viewUser.bind(this);
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers() {
        UserService.getUsers().then((res) => {
            if (res.data == null) {
                this.props.history.push('/add-user/_add');
            }
            this.setState({ users: res.data });
        });
    }

    addUser() {
        this.props.history.push('/add-user/_add');
    }

    handleSearchChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    getFilteredUsers() {
        const { users, searchTerm } = this.state;

        return users.filter(
            (user) =>
                user.nama_peminjam.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.judul.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    editUser(id) {
        this.props.history.push(`/add-user/${id}`);
    }

    deleteUser(id) {
        Swal.fire({
            title: 'Anda Yakin?',
            text: 'Anda tidak dapat mengembalikan data yang sudah dihapus!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Tidak',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        }).then((result) => {
            if (result.isConfirmed) {
                UserService.deleteUser(id).then((res) => {
                    this.setState({
                        users: this.state.users.filter((user) => user.id !== id),
                    });

                    Swal.fire(
                        'Terhapus!',
                        'Data sudah dihapus',
                        'success'
                    );
                });
            }
        });
    }

    viewUser(id) {
        this.props.history.push(`/view-user/${id}`);
    }

    render() {
        return (
            <div className="container my-5">
                <h2 className="text-center mb-4">Inventory List</h2>
                <div className="row mb-3">
                    <div className="col-md-9 mb-2 mb-md-0">
                        <button className="btn btn-info" onClick={this.addUser}>
                            <FontAwesomeIcon icon={faPlus} className="me-1" /> Add
                        </button>
                    </div>
                    <div className='col-md-3 d-flex justify-content-end'>
                        <input
                            type='search'
                            id="form1" 
                            className="form-control"
                            value={this.state.searchTerm}
                            placeholder='Cari...'
                            onChange={this.handleSearchChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr className='text-center'>
                                <th scope="col">Nama Peminjam</th>
                                <th scope="col">Judul Buku</th>
                                <th scope="col">Jumlah</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getFilteredUsers().map((user) => (
                                <tr key={user.id} className='text-center'>
                                    <td>{user.nama_peminjam}</td>
                                    <td>{user.judul}</td>
                                    <td>{user.jumlah}</td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-info mx-2"
                                            onClick={() => this.viewUser(user.id)}
                                        >
                                            <FontAwesomeIcon icon={faEye} className="me-1" />
                                        </button>
                                        <button
                                            className="btn btn-warning mx-2"
                                            onClick={() => this.editUser(user.id)}
                                        >
                                            <FontAwesomeIcon icon={faEdit} className="me-1" />
                                        </button>
                                        <button
                                            className="btn btn-danger mx-2"
                                            onClick={() => this.deleteUser(user.id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} className="me-1" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListUserComponent;