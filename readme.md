# Software Engineering Placement Code
_Written by Amy Kernutt_

## C++ Task

For this task, the code was written and compiled within Xcode. It will run from the terminal command line, request an input calculation where the user would then input a sum e.g. 42*7 and the code will run, and produce an answer which will be printed out to the console.

### <u>Division</u>

Adding the division functionality was essentially repeating code used for the other operators. Firstly I included a new type in public called 'divide'.

Further into the code I added an extra if statement for the divide function which essentially looks for the divide symbol (/) in the input string.

```
if (find(input, "/"))
            return Type::divide;
```

For the left hand side of the input calculation I included an if statement which identifies the number on the LHS of the sum and locates the divide symbol. This result is then returned.

```
if (auto result = findAndExtractLHS(input, "/"))
            return result;
```

Then I repeated this process for the right hand side.
```
if (auto result = findAndExtractRHS(input, "/"))
            return result;
```
Following this I added a new case to the Tokeniser of type 'divide'. Which would essentially return the LHS divided by the RHS which had both been identified in the previous section. 
```
case Tokeniser::Type::divide:
            return tokens.lhs / tokens.rhs;
```


### <u>Adding pi instead of 3.141</u> 

Firstly I defined PI as a const double. 

I then introduced a const auto subs which would identify first element before pos (the operator within the input sum), this is taken out as substring. Following this with an if statement which would check that character, and if it was a 'p', then PI would be returned. I used tolower here to convert to lowercase to cover pi, Pi and PI. 

Now this method isn't perfect as it only checks whether the FIRST character from the user input is 'p', so essentially if the user was to write 'pineapple' into the system, then it would identify this as PI. 
```
const auto subs = input.substr(0, pos);
            if (tolower(subs[0]) == 'p' ) 
                return PI;
```

Now for the RHS of the input calculation I could've just repeated the process as above but change (0, pos) to (pos + 1) which would then be looking at the element after the operator symbol. However, after trying this I realised that pi would only be recognised if it was inputted WITHOUT a space after the operator symbol, e.g. 4+pi. So if there was a space like 4+ pi, the calculation would run as normal. So to fix this I instead used find_first_of("pP") which would locate either p or P in that last element whether there was a space or not. This meant that when the user inputs 4+pi or 4 + pi, pi will be correctly identified and the result will be correct. 
```
if (auto pos = input.find(character); pos != std::string::npos)
        {
            // --- NEW/CHANGED CODE ---
            const auto subs = input.substr(pos + 1);
            std::size_t found = subs.find_first_of("pP");
            if (found != std::string::npos)
                return PI;
            else
                return std::stod(input.substr(pos + 1));
```

### <u>Mistakes/errors</u> 

In terms of fixing problems, I included #include <cassert> and #include <cmath> in order for the result checker to work. This is because before, the return assert line would come up with an error indicating the call to abs is ambiguous. Adding the <cmath> library allowed the build to succeed. Also had to #include <cstudio> to use the find_first_of function.

### <u>Test Calculation Examples</u> 

I used the test calculation code that we were given and changed the sum accordingly as well as the characters in the resultChecker and the type in the last line of each block. And then finally the characters and types in the check lines at the bottom. 

### <u>Pi to 5dp</u>

For this,I included std::sprintf(buffer, "%.5f", num). The %.5f part effectively corrected calculation results to return in 5 decimal place format. However, this isn't specific to pi calculations only, for any input sum that is given, the answer will be returned to 5dp. 
```
if(auto tokens = Tokeniser().tokenise(input))
        {
            auto num = Calculator().calculate(*tokens);
            char buffer [16];
            std::sprintf(buffer, "%.5f", num);
            std::cout << "Answer: " << buffer << std::endl;
        }
```

# Web API Parsing Task

This script was written within Visual Studio Code using Javascript(node). It runs succesfully from the terminal command line.

### <u>Write a simple script that downloads the content of https://api.ampifymusic.com/packs </u>
Firstly I used const https = require('https'); to make sure https is included. For the next block of code I used the node.js library to help me. https.get specified the URL that we will be downloading information from. The next section checks the value coming back from the get URL function. This is checking to make sure the content type is in json format. When checking for error codes, if value is not 200, then an error message will display and the program will exit. Lines 21-26 essentially frees up the memory when an error occurs. 

Then setting the encoding to standard 8 bit using 
```
res.setEncoding('utf8');
```
I then use es.on('data', (chunk) => { rawData += chunk; }); to receive the data in chunks, this way large data can be managed efficiently. 

### <u>Parse the response and sort it into a set of genres</u>
Now for the processing of the data. I create a new set called genreSet which is where the list of genres will be stored, by using a set, it avoids creating duplicates of the genre types. I then create an array for the list of genres that will be searched for. And specifying the genre we will be looking for using const SEARCH_GENRE = "hip-hop";

Next I converted the string into json object format using
```
const parsedData = JSON.parse(rawData);
```
I then used a forEach command which will do the following code for each element in that genre list array. I assumed that each pack could possibly be assigned more than one genre so I did a loop within a loop. It takes the genre of the pack and adds it to the genre list, and because it's a set, there will be no duplicates. Then I include an if statement which will save the current element of the larger array in the search genre list if it is the genre we are specifically looking for, in this case hip-hop. This saves me searching through all the packs again.
```
                if (gen === SEARCH_GENRE)
                searchList.push(element);
```

### <u>Print out a list of all the genres</u>
I then just use the console.log to print out a title of Genre List to the console, allowing the user to clearly identify the next information. It will then print out each element in the genre list array. 

### <u>Print out a list of all the packs in the genre ‘hip-hop’</u>
After this I print out another title to the console, indicating the genre we are looking for in the format of a variable )in case we want to change the genre we're looking for in the future), followed by pack list. Then each element within the chosen genre will be printed out to the console as well as their pack ID. 


### _References_

1. https://nodejs.org/api/https.html
2. https://www.cplusplus.com/reference/
3. https://www.cplusplus.com/reference/string/string/find_first_of/
4. http://www.cplusplus.com/forum/beginner/45020/
5. https://www.w3schools.com/js/js_api_intro.asp
6. https://github.com/Project-OSRM/osrm-backend/issues/1000

