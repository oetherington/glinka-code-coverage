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
{"lineNum":"   19","line":"const expectEqual = std.testing.expectEqual;"},
{"lineNum":"   20","line":"const expectEqualStrings = std.testing.expectEqualStrings;"},
{"lineNum":"   21","line":"const Cursor = @import(\"../../common/cursor.zig\").Cursor;"},
{"lineNum":"   22","line":""},
{"lineNum":"   23","line":"pub const ImplicitAnyError = struct {"},
{"lineNum":"   24","line":"    csr: Cursor,"},
{"lineNum":"   25","line":"    symbol: []const u8,"},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"    pub fn new(csr: Cursor, symbol: []const u8) ImplicitAnyError {","class":"lineCov","hits":"1","order":"2382","possible_hits":"1",},
{"lineNum":"   28","line":"        return ImplicitAnyError{","class":"lineCov","hits":"1","order":"2385","possible_hits":"1",},
{"lineNum":"   29","line":"            .csr = csr,","class":"lineCov","hits":"1","order":"2383","possible_hits":"1",},
{"lineNum":"   30","line":"            .symbol = symbol,","class":"lineCov","hits":"1","order":"2384","possible_hits":"1",},
{"lineNum":"   31","line":"        };"},
{"lineNum":"   32","line":"    }"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"    pub fn report(self: ImplicitAnyError, writer: anytype) !void {","class":"linePartCov","hits":"2","order":"2396","possible_hits":"4",},
{"lineNum":"   35","line":"        try writer.print(","class":"linePartCov","hits":"1","order":"2400","possible_hits":"2",},
{"lineNum":"   36","line":"            \"Error: {d}:{d}: Untyped symbol \'{s}\' implicitely has type \'any\'\\n\","},
{"lineNum":"   37","line":"            .{"},
{"lineNum":"   38","line":"                self.csr.ln,","class":"linePartCov","hits":"1","order":"2397","possible_hits":"2",},
{"lineNum":"   39","line":"                self.csr.ch,","class":"linePartCov","hits":"1","order":"2398","possible_hits":"2",},
{"lineNum":"   40","line":"                self.symbol,","class":"linePartCov","hits":"1","order":"2399","possible_hits":"2",},
{"lineNum":"   41","line":"            },"},
{"lineNum":"   42","line":"        );"},
{"lineNum":"   43","line":"    }"},
{"lineNum":"   44","line":"};"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"test \"can initialize an ImplicitAnyError\" {","class":"lineCov","hits":"2","order":"2457","possible_hits":"2",},
{"lineNum":"   47","line":"    const csr = Cursor.new(2, 5);","class":"lineCov","hits":"1","order":"2458","possible_hits":"1",},
{"lineNum":"   48","line":"    const symbol = \"anySymbol\";"},
{"lineNum":"   49","line":"    const err = ImplicitAnyError.new(csr, symbol);","class":"lineCov","hits":"1","order":"2459","possible_hits":"1",},
{"lineNum":"   50","line":"    try expectEqual(csr, err.csr);","class":"lineCov","hits":"1","order":"2460","possible_hits":"1",},
{"lineNum":"   51","line":"    try expectEqualStrings(symbol, err.symbol);","class":"lineCov","hits":"1","order":"2461","possible_hits":"1",},
{"lineNum":"   52","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-02 21:08:39", "instrumented" : 14, "covered" : 14,};
var merged_data = [];
