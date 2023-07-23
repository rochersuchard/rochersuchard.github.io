fetch("/assets/js/pli07.txt")
    .then((res) => res.text())
    .then((text) => {
        let lines = text.split("\n");
        let maxSize = 0;
        let maxWord = 0;
        for(let line of lines)
        {
            if(line.length > maxSize) 
            {
                maxSize = line.length;
                maxWord = line;
            }
        }

        console.log(maxSize);
        console.log(maxWord);

    })
    .catch((e) => console.error(e))