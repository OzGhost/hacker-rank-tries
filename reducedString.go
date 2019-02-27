package main

import (
  "fmt"
  "bytes"
  "bufio"
  "io"
  "os"
  "strings"
)

func cutDown(input string) string {
  ln := len(input)
  if ln < 1 {
    return input
  }
  var downTime int
  var buff bytes.Buffer

  for i := 0; i < ln; i++ {
    if i+1 < ln && input[i] == input[i+1] {
      i++;
      downTime++;
    } else {
      buff.WriteString(string(input[i]))
    }
  }
  if downTime == 0 {
    return input
  } else {
    return cutDown(buff.String())
  }
}

/*
func main() {
  fmt.Println("expected: abd vs " + cutDown("aaabccddd"));
  fmt.Println("expected: '' vs " + cutDown("aa"));
}
*/

func superReducedString(s string) string {
  out := cutDown(s)
  if len(out) < 1 {
    return "Empty String"
  }
  return out
}

func main() {
    reader := bufio.NewReaderSize(os.Stdin, 16 * 1024 * 1024)
    stdout, err := os.Create(os.Getenv("OUTPUT_PATH"))
    checkError(err)
    defer stdout.Close()
    writer := bufio.NewWriterSize(stdout, 16 * 1024 * 1024)
    s := readLine(reader)
    result := superReducedString(s)
    fmt.Fprintf(writer, "%s\n", result)
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

