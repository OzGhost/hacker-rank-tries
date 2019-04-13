package main

import (
    "bufio"
    "fmt"
    "io"
    "os"
    "strconv"
    "strings"
)

// Complete the weightedUniformStrings function below.
func weightedUniformStrings(s string, queries []int32) []string {
    cage := make([]int, 27)
    prev := int(s[0]-96)
    cter := 1
    cage[prev] = 1
    for i:=1; i<len(s);i++ {
        v := int(s[i]-96)
        // fmt.Println("found ", v)
        if v == prev {
            cter++
        } else {
            if (cter > cage[prev]) {
                cage[prev] = cter
            }
            cter = 1
            prev = v
        }
    }
    if (cter > cage[prev]) {
        cage[prev] = cter
    }
    fmt.Println(cage)
    out := make([]string, 0)
    var m string
    for _, x := range queries {
        i := 1
        for ; i < 27; i++ {
            v := int32(cage[i])
            j := int32(i)
            if x%j == 0 && x/j <= v {
                break
            }
        }
        if i > 26 {
            m = "No"
        } else {
            m = "Yes"
        }
        out = append(out, m)
    }
    return out
}

func main() {
    reader := bufio.NewReaderSize(os.Stdin, 1024 * 1024)

    stdout, err := os.Create("/tmp/out.txt")
    checkError(err)

    defer stdout.Close()

    writer := bufio.NewWriterSize(stdout, 1024 * 1024)

    s := readLine(reader)

    queriesCount, err := strconv.ParseInt(readLine(reader), 10, 64)
    checkError(err)

    var queries []int32

    for i := 0; i < int(queriesCount); i++ {
        queriesItemTemp, err := strconv.ParseInt(readLine(reader), 10, 64)
        checkError(err)
        queriesItem := int32(queriesItemTemp)
        queries = append(queries, queriesItem)
    }

    result := weightedUniformStrings(s, queries)

    for i, resultItem := range result {
        fmt.Fprintf(writer, "%s", resultItem)

        if i != len(result) - 1 {
            fmt.Fprintf(writer, "\n")
        }
    }

    fmt.Fprintf(writer, "\n")

    writer.Flush()
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

