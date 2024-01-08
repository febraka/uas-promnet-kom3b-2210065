package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

func main() {
	Routers()
}

func Routers() {
	InitDB()
	defer db.Close()
	log.Println("Starting the HTTP server on port 9080")
	router := mux.NewRouter()
	router.HandleFunc("/users", GetUsers).Methods("GET")
	router.HandleFunc("/users", CreateUser).Methods("POST")
	router.HandleFunc("/users/{id}", GetUser).Methods("GET")
	router.HandleFunc("/users/{id}", UpdateUser).Methods("PUT")
	router.HandleFunc("/users/{id}", DeleteUser).Methods("DELETE")
	http.ListenAndServe(":9080", &CORSRouterDecorator{router})
}

/***************************************************/

// Get all users
func GetUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var users []User

	result, err := db.Query("SELECT id, judul, jumlah, nama_peminjam, alamat_peminjam, no_hp_peminjam, tanggal_pinjam, tanggal_kembali, lama_pinjam FROM peminjamanBuku_febraka")
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	for result.Next() {
		var user User
		err := result.Scan(&user.ID, &user.Judul, &user.Jumlah, &user.NamaPeminjam, &user.AlamatPeminjam, &user.NoHpPeminjam, &user.TanggalPinjam, &user.TanggalKembali, &user.LamaPinjam)
		if err != nil {
			panic(err.Error())
		}
		users = append(users, user)
	}
	json.NewEncoder(w).Encode(users)
}

// Create user
func CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	stmt, err := db.Prepare("INSERT INTO peminjamanBuku_febraka(judul, jumlah, nama_peminjam, alamat_peminjam, no_hp_peminjam, tanggal_pinjam, tanggal_kembali, lama_pinjam) VALUES(?,?,?,?,?,?,?,?)")
	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	judul := keyVal["judul"]
	jumlah := keyVal["jumlah"]
	nama_peminjam := keyVal["nama_peminjam"]
	alamat_peminjam := keyVal["alamat_peminjam"]
	no_hp_peminjam := keyVal["no_hp_peminjam"]
	tanggal_pinjam := keyVal["tanggal_pinjam"]
	tanggal_kembali := keyVal["tanggal_kembali"]
	lama_pinjam := keyVal["lama_pinjam"]

	_, err = stmt.Exec(judul, jumlah, nama_peminjam, alamat_peminjam, no_hp_peminjam, tanggal_pinjam, tanggal_kembali, lama_pinjam)
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "New user was created")
}

// Get user by ID
func GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	result, err := db.Query("SELECT id, judul, jumlah, nama_peminjam, alamat_peminjam, no_hp_peminjam, tanggal_pinjam, tanggal_kembali, lama_pinjam FROM peminjamanBuku_febraka WHERE id = ?", params["id"])
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()
	var user User
	for result.Next() {
		err := result.Scan(&user.ID, &user.Judul, &user.Jumlah, &user.NamaPeminjam, &user.AlamatPeminjam, &user.NoHpPeminjam, &user.TanggalPinjam, &user.TanggalKembali, &user.LamaPinjam)
		if err != nil {
			panic(err.Error())
		}
	}
	json.NewEncoder(w).Encode(user)
}

// Update user
func UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("UPDATE peminjamanBuku_febraka SET judul = ?, jumlah = ?, nama_peminjam = ?, alamat_peminjam = ?, no_hp_peminjam = ?, tanggal_pinjam = ?, tanggal_kembali = ?, lama_pinjam = ? WHERE id = ?")

	if err != nil {
		panic(err.Error())
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	keyVal := make(map[string]string)
	json.Unmarshal(body, &keyVal)
	judul := keyVal["judul"]
	jumlah := keyVal["jumlah"]
	nama_peminjam := keyVal["nama_peminjam"]
	alamat_peminjam := keyVal["alamat_peminjam"]
	no_hp_peminjam := keyVal["no_hp_peminjam"]
	tanggal_pinjam := keyVal["tanggal_pinjam"]
	tanggal_kembali := keyVal["tanggal_kembali"]
	lama_pinjam := keyVal["lama_pinjam"]

	_, err = stmt.Exec(judul, jumlah, nama_peminjam, alamat_peminjam, no_hp_peminjam, tanggal_pinjam, tanggal_kembali, lama_pinjam, params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "User with ID = %s was updated", params["id"])
}

// Delete user
func DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("DELETE FROM peminjamanBuku_febraka WHERE id = ?")
	if err != nil {
		panic(err.Error())
	}
	_, err = stmt.Exec(params["id"])
	if err != nil {
		panic(err.Error())
	}
	fmt.Fprintf(w, "User with ID = %s was deleted", params["id"])
}

type User struct {
	ID             string `json:"id"`
	Judul          string `json:"judul"`
	Jumlah         string `json:"jumlah"`
	NamaPeminjam   string `json:"nama_peminjam"`
	AlamatPeminjam string `json:"alamat_peminjam"`
	NoHpPeminjam   string `json:"no_hp_peminjam"`
	TanggalPinjam  string `json:"tanggal_pinjam"`
	TanggalKembali string `json:"tanggal_kembali"`
	LamaPinjam     string `json:"lama_pinjam"`
}

var db *sql.DB
var err error

func InitDB() {
	db, err = sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/db_2210065_febraka_uas_pilkomB")
	if err != nil {
		panic(err.Error())
	}
}

/***************************************************/

// CORSRouterDecorator applies CORS headers to a mux.Router
type CORSRouterDecorator struct {
	R *mux.Router
}

func (c *CORSRouterDecorator) ServeHTTP(rw http.ResponseWriter, req *http.Request) {
	if origin := req.Header.Get("Origin"); origin != "" {
		rw.Header().Set("Access-Control-Allow-Origin", origin)
		rw.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		rw.Header().Set("Access-Control-Allow-Headers", "Accept, Accept-Language, Content-Type, YourOwnHeader")
	}
	// Stop here if it's Preflighted OPTIONS request
	if req.Method == "OPTIONS" {
		return
	}

	c.R.ServeHTTP(rw, req)
}
