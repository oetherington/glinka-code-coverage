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
{"lineNum":"   21","line":"const ParseResult = @import(\"parse_result.zig\").ParseResult;"},
{"lineNum":"   22","line":"const ParseError = @import(\"parse_error.zig\").ParseError;"},
{"lineNum":"   23","line":"const Cursor = @import(\"cursor.zig\").Cursor;"},
{"lineNum":"   24","line":"const node = @import(\"node.zig\");"},
{"lineNum":"   25","line":"const allocate = @import(\"allocate.zig\");"},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"pub const Parser = struct {"},
{"lineNum":"   28","line":"    callbacks: struct {"},
{"lineNum":"   29","line":"        currentCursor: fn (self: *Parser) Cursor,"},
{"lineNum":"   30","line":"        parseExpr: fn (self: *Parser) ParseResult,"},
{"lineNum":"   31","line":"        parseType: fn (self: *Parser) ParseResult,"},
{"lineNum":"   32","line":"        parseBlock: fn (self: *Parser) ParseResult,"},
{"lineNum":"   33","line":"        parseStmt: fn (self: *Parser) ParseResult,"},
{"lineNum":"   34","line":"    },"},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"    pub fn currentCursor(self: *Parser) Cursor {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   37","line":"        return self.callbacks.currentCursor(self);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   38","line":"    }"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"    pub fn parseExpr(self: *Parser) ParseResult {"},
{"lineNum":"   41","line":"        return self.callbacks.parseExpr(self);"},
{"lineNum":"   42","line":"    }"},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"    pub fn parseType(self: *Parser) ParseResult {","class":"lineCov","hits":"1","order":"4055","possible_hits":"1",},
{"lineNum":"   45","line":"        return self.callbacks.parseType(self);","class":"lineCov","hits":"1","order":"4056","possible_hits":"1",},
{"lineNum":"   46","line":"    }"},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"    pub fn parseBlock(self: *Parser) ParseResult {"},
{"lineNum":"   49","line":"        return self.callbacks.parseBlock(self);"},
{"lineNum":"   50","line":"    }"},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"    pub fn parseStmt(self: *Parser) ParseResult {","class":"lineCov","hits":"1","order":"2960","possible_hits":"1",},
{"lineNum":"   53","line":"        return self.callbacks.parseStmt(self);","class":"lineCov","hits":"1","order":"2961","possible_hits":"1",},
{"lineNum":"   54","line":"    }"},
{"lineNum":"   55","line":""},
{"lineNum":"   56","line":"    pub fn next(self: *Parser) ParseResult {","class":"lineCov","hits":"1","order":"2958","possible_hits":"1",},
{"lineNum":"   57","line":"        return self.parseStmt();","class":"lineCov","hits":"1","order":"2959","possible_hits":"1",},
{"lineNum":"   58","line":"    }"},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"    pub fn getAst(self: *Parser, arena: *Arena) ParseResult {","class":"lineCov","hits":"1","order":"2952","possible_hits":"1",},
{"lineNum":"   61","line":"        var alloc = arena.allocator();","class":"lineCov","hits":"1","order":"2953","possible_hits":"1",},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"        var nd = node.makeNode(","class":"lineCov","hits":"1","order":"2955","possible_hits":"1",},
{"lineNum":"   64","line":"            alloc,"},
{"lineNum":"   65","line":"            Cursor.new(1, 1),","class":"lineCov","hits":"1","order":"2954","possible_hits":"1",},
{"lineNum":"   66","line":"            .Program,"},
{"lineNum":"   67","line":"            node.NodeList{},"},
{"lineNum":"   68","line":"        );"},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"        while (true) {","class":"lineCov","hits":"2","order":"2956","possible_hits":"2",},
{"lineNum":"   71","line":"            const res = self.next();","class":"lineCov","hits":"1","order":"2957","possible_hits":"1",},
{"lineNum":"   72","line":""},
{"lineNum":"   73","line":"            switch (res) {","class":"linePartCov","hits":"1","order":"3028","possible_hits":"2",},
{"lineNum":"   74","line":"                .Success => |node| {","class":"lineCov","hits":"1","order":"3029","possible_hits":"1",},
{"lineNum":"   75","line":"                    switch (node.getType()) {","class":"lineCov","hits":"2","order":"3030","possible_hits":"2",},
{"lineNum":"   76","line":"                        .EOF => return ParseResult.success(nd),","class":"lineCov","hits":"1","order":"3037","possible_hits":"1",},
{"lineNum":"   77","line":"                        else => nd.data.Program.append(","class":"linePartCov","hits":"2","order":"3031","possible_hits":"3",},
{"lineNum":"   78","line":"                            alloc,"},
{"lineNum":"   79","line":"                            node,","class":"lineCov","hits":"1","order":"3032","possible_hits":"1",},
{"lineNum":"   80","line":"                        ) catch allocate.reportAndExit(),","class":"linePartCov","hits":"2","order":"3033","possible_hits":"3",},
{"lineNum":"   81","line":"                    }"},
{"lineNum":"   82","line":"                },"},
{"lineNum":"   83","line":"                .Error => |err| return ParseResult.err(err),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   84","line":"                .NoMatch => |err| {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   85","line":"                    const theError = if (err) |perr|","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   86","line":"                        perr","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   87","line":"                    else"},
{"lineNum":"   88","line":"                        ParseError.message(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   89","line":"                            self.currentCursor(),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   90","line":"                            \"Expected a top-level statement\","},
{"lineNum":"   91","line":"                        );"},
{"lineNum":"   92","line":""},
{"lineNum":"   93","line":"                    return ParseResult.err(theError);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   94","line":"                },"},
{"lineNum":"   95","line":"            }"},
{"lineNum":"   96","line":"        }"},
{"lineNum":"   97","line":"    }"},
{"lineNum":"   98","line":"};"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-04 07:46:05", "instrumented" : 28, "covered" : 19,};
var merged_data = [];
