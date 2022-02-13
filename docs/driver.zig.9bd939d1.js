var data = {lines:[
{"lineNum":"    1","line":"// glinka"},
{"lineNum":"    2","line":"// Copyright (C) 2021-2022 Ollie Etherington"},
{"lineNum":"    3","line":"// <www.etherington.io>"},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// This program is free software: you can redistribute it and/or modify"},
{"lineNum":"    6","line":"// it under the terms of the GNU Affero General Public License as published"},
{"lineNum":"    7","line":"// by the Free Software Foundation, either version 3 of the License, or"},
{"lineNum":"    8","line":"// (at your option) any later version."},
{"lineNum":"    9","line":"//"},
{"lineNum":"   10","line":"// This program is distributed in the hope that it will be useful,"},
{"lineNum":"   11","line":"// but WITHOUT ANY WARRANTY; without even the implied warranty of"},
{"lineNum":"   12","line":"// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the"},
{"lineNum":"   13","line":"// GNU Affero General Public License for more details."},
{"lineNum":"   14","line":"//"},
{"lineNum":"   15","line":"// You should have received a copy of the GNU Affero General Public License"},
{"lineNum":"   16","line":"// along with this program. If not, see <http://www.gnu.org/licenses/>."},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"const std = @import(\"std\");"},
{"lineNum":"   19","line":"const Allocator = std.mem.Allocator;"},
{"lineNum":"   20","line":"const Arena = std.heap.ArenaAllocator;"},
{"lineNum":"   21","line":"const Parser = @import(\"parser.zig\").Parser;"},
{"lineNum":"   22","line":"const ParseResult = @import(\"parse_result.zig\").ParseResult;"},
{"lineNum":"   23","line":""},
{"lineNum":"   24","line":"pub fn Driver(comptime ParserImpl: type) type {"},
{"lineNum":"   25","line":"    return struct {"},
{"lineNum":"   26","line":"        const This = @This();"},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"        pub const ParsedFile = struct {"},
{"lineNum":"   29","line":"            code: []u8,"},
{"lineNum":"   30","line":"            res: ParseResult,"},
{"lineNum":"   31","line":"        };"},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"        alloc: Allocator,"},
{"lineNum":"   34","line":"        arena: Arena,"},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"        pub fn new(alloc: Allocator) This {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   37","line":"            return This{","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   38","line":"                .alloc = alloc,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   39","line":"                .arena = Arena.init(alloc),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   40","line":"            };"},
{"lineNum":"   41","line":"        }"},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"        pub fn deinit(self: This) void {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   44","line":"            self.arena.deinit();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   45","line":"        }"},
{"lineNum":"   46","line":""},
{"lineNum":"   47","line":"        fn readCodeFromFile(self: *This, path: []const u8) ![]u8 {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   48","line":"            return try std.fs.cwd().readFileAlloc(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   49","line":"                self.arena.allocator(),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   50","line":"                path,"},
{"lineNum":"   51","line":"                std.math.maxInt(usize),"},
{"lineNum":"   52","line":"            );"},
{"lineNum":"   53","line":"        }"},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"        fn readCodeFromStdin(self: *This) ![]u8 {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   56","line":"            const stdin = std.io.getStdIn();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   57","line":""},
{"lineNum":"   58","line":"            var arrayList = std.ArrayList(u8).init(self.alloc);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   59","line":"            defer arrayList.deinit();","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   60","line":"            const maxSize = std.math.maxInt(usize);"},
{"lineNum":"   61","line":"            try stdin.reader().readAllArrayList(&arrayList, maxSize);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"            const arena = self.arena.allocator();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   64","line":"            var out = try arena.alloc(u8, arrayList.items.len);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   65","line":"            std.mem.copy(u8, out, arrayList.items);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   66","line":"            return out;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   67","line":"        }"},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"        pub fn parseFile(self: *This, path: []const u8) !ParsedFile {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   70","line":"            const code = if (std.mem.eql(u8, path, \"-\"))","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   71","line":"                try self.readCodeFromStdin()","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   72","line":"            else"},
{"lineNum":"   73","line":"                try self.readCodeFromFile(path);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"            var parserImpl = ParserImpl.new(&self.arena, code);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   76","line":"            var parser = parserImpl.getParser();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"            var res = parser.getAst(&self.arena);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   79","line":""},
{"lineNum":"   80","line":"            return ParsedFile{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   81","line":"                .code = code,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   82","line":"                .res = res,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   83","line":"            };"},
{"lineNum":"   84","line":"        }"},
{"lineNum":"   85","line":"    };"},
{"lineNum":"   86","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-13 15:55:52", "instrumented" : 28, "covered" : 0,};
var merged_data = [];
