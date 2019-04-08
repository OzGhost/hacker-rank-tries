package main

import (
    "bufio"
    "fmt"
    "io"
    "os"
    "strconv"
    "strings"
)

// Complete the countSort function below.
func countSort(arr [][]string) {
    store  := make([][]string, 100)
    for i := 0; i < 100; i++ {
        store[i] = make([]string, 0)
    }
    for i,x:= range arr {
        v := "-"
        if i+1 > len(arr)/2 {
            v = x[1]
        }
        index,_ := strconv.ParseInt(x[0], 10, 32)
        fmt.Println("cout << got ", x[0], " after parse: ", index);
        store[index] = append(store[index], v)
    }
    for _,x:= range store {
        for _, y:= range x {
            fmt.Print(y, " ")
        }
    }
}

func main() {
    reader := bufio.NewReaderSize(os.Stdin, 16 * 1024 * 1024)

    nTemp, err := strconv.ParseInt(strings.TrimSpace(readLine(reader)), 10, 64)
    checkError(err)
    n := int32(nTemp)

    var arr [][]string
    for i := 0; i < int(n); i++ {
        arrRowTemp := strings.Split(strings.TrimRight(readLine(reader)," \t\r\n"), " ")

        var arrRow []string
        for _, arrRowItem := range arrRowTemp {
            arrRow = append(arrRow, arrRowItem)
        }

        if len(arrRow) != 2 {
            panic("Bad input")
        }

        arr = append(arr, arrRow)
    }

    countSort(arr)
}

func readLine(reader *bufio.Reader) string {
    str, _, err := reader.ReadLine()
    if err == io.EOF {
        return ""
    }

    return strings.TrimRight(string(str), "\r\n")
}

func checkError(err error) {
    if err != nil {
        panic(err)
    }
}

