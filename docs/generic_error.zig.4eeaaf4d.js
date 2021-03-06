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
{"lineNum":"   22","line":"const TokenType = @import(\"../../common/token.zig\").Token.Type;"},
{"lineNum":"   23","line":"const Type = @import(\"../../common/types/type.zig\").Type;"},
{"lineNum":"   24","line":""},
{"lineNum":"   25","line":"pub const GenericError = struct {"},
{"lineNum":"   26","line":"    csr: Cursor,"},
{"lineNum":"   27","line":"    msg: []const u8,"},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"    pub fn new(csr: Cursor, msg: []const u8) GenericError {","class":"lineCov","hits":"1","order":"2426","possible_hits":"1",},
{"lineNum":"   30","line":"        return GenericError{","class":"lineCov","hits":"1","order":"2429","possible_hits":"1",},
{"lineNum":"   31","line":"            .csr = csr,","class":"lineCov","hits":"1","order":"2427","possible_hits":"1",},
{"lineNum":"   32","line":"            .msg = msg,","class":"lineCov","hits":"1","order":"2428","possible_hits":"1",},
{"lineNum":"   33","line":"        };"},
{"lineNum":"   34","line":"    }"},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"    pub fn report(self: GenericError, writer: anytype) !void {","class":"linePartCov","hits":"2","order":"2439","possible_hits":"4",},
{"lineNum":"   37","line":"        try writer.print(","class":"linePartCov","hits":"1","order":"2443","possible_hits":"2",},
{"lineNum":"   38","line":"            \"Error: {d}:{d}: {s}\\n\","},
{"lineNum":"   39","line":"            .{"},
{"lineNum":"   40","line":"                self.csr.ln,","class":"linePartCov","hits":"1","order":"2440","possible_hits":"2",},
{"lineNum":"   41","line":"                self.csr.ch,","class":"linePartCov","hits":"1","order":"2441","possible_hits":"2",},
{"lineNum":"   42","line":"                self.msg,","class":"linePartCov","hits":"1","order":"2442","possible_hits":"2",},
{"lineNum":"   43","line":"            },"},
{"lineNum":"   44","line":"        );"},
{"lineNum":"   45","line":"    }"},
{"lineNum":"   46","line":"};"},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"test \"can initialize and report a GenericError\" {","class":"lineCov","hits":"2","order":"2559","possible_hits":"2",},
{"lineNum":"   49","line":"    const csr = Cursor.new(2, 5);","class":"lineCov","hits":"1","order":"2560","possible_hits":"1",},
{"lineNum":"   50","line":"    const msg = \"Some error message\";"},
{"lineNum":"   51","line":"    const err = GenericError.new(csr, msg);","class":"lineCov","hits":"1","order":"2561","possible_hits":"1",},
{"lineNum":"   52","line":"    try expectEqual(csr, err.csr);","class":"lineCov","hits":"1","order":"2562","possible_hits":"1",},
{"lineNum":"   53","line":"    try expectEqualStrings(msg, err.msg);","class":"lineCov","hits":"1","order":"2563","possible_hits":"1",},
{"lineNum":"   54","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-13 15:59:30", "instrumented" : 14, "covered" : 14,};
var merged_data = [];
