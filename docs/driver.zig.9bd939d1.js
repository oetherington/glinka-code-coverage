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
{"lineNum":"   33","line":"        arena: Arena,"},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"        pub fn new(alloc: Allocator) This {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   36","line":"            return This{","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   37","line":"                .arena = Arena.init(alloc),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   38","line":"            };"},
{"lineNum":"   39","line":"        }"},
{"lineNum":"   40","line":""},
{"lineNum":"   41","line":"        pub fn deinit(self: This) void {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   42","line":"            self.arena.deinit();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   43","line":"        }"},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"        pub fn parseFile(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   46","line":"            self: *This,"},
{"lineNum":"   47","line":"            path: []const u8,"},
{"lineNum":"   48","line":"        ) !ParsedFile {"},
{"lineNum":"   49","line":"            const cwd = std.fs.cwd();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"            const code = try cwd.readFileAlloc(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   52","line":"                self.arena.allocator(),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   53","line":"                path,"},
{"lineNum":"   54","line":"                std.math.maxInt(usize),"},
{"lineNum":"   55","line":"            );"},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"            var parserImpl = ParserImpl.new(&self.arena, code);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   58","line":"            var parser = parserImpl.getParser();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"            var res = parser.getAst(&self.arena);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"            return ParsedFile{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   63","line":"                .code = code,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   64","line":"                .res = res,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   65","line":"            };"},
{"lineNum":"   66","line":"        }"},
{"lineNum":"   67","line":"    };"},
{"lineNum":"   68","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-11 07:31:37", "instrumented" : 15, "covered" : 0,};
var merged_data = [];
