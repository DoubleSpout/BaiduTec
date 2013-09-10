package main
import (
  "fmt"
  "net/http"
  "strconv"
)
func fibo(n int, ch chan int) {
    x, y := 1, 1
    for i := 0; i < n; i++ {
        x, y = y, x + y
    }
    ch <- x
    close(ch)
}

func fiboHandle(w http.ResponseWriter, r *http.Request) {
    path := r.URL.Path[1:]   
    if path == "favicon.ico"  {
        http.NotFound(w, r)
        return
    }
    numSting := r.URL.Query().Get("n")
    n,err := strconv.Atoi(numSting)
    if(err != nil){
        n = 1
    }
    ch := make(chan int)
    go fibo(n, ch)
    nRes :=  <-ch
    fmt.Fprintf(w, "%d\n",nRes)
}
func main() {
  http.HandleFunc("/", fiboHandle)
  http.ListenAndServe(":8124", nil)
}