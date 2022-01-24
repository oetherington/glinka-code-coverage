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
{"lineNum":"   25","line":"pub const ContextError = struct {"},
{"lineNum":"   26","line":"    csr: Cursor,"},
{"lineNum":"   27","line":"    found: []const u8,"},
{"lineNum":"   28","line":"    expectedContext: []const u8,"},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"    pub fn new(","class":"lineCov","hits":"1","order":"2701","possible_hits":"1",},
{"lineNum":"   31","line":"        csr: Cursor,"},
{"lineNum":"   32","line":"        found: []const u8,"},
{"lineNum":"   33","line":"        expectedContext: []const u8,"},
{"lineNum":"   34","line":"    ) ContextError {"},
{"lineNum":"   35","line":"        return ContextError{","class":"lineCov","hits":"1","order":"2705","possible_hits":"1",},
{"lineNum":"   36","line":"            .csr = csr,","class":"lineCov","hits":"1","order":"2702","possible_hits":"1",},
{"lineNum":"   37","line":"            .found = found,","class":"lineCov","hits":"1","order":"2703","possible_hits":"1",},
{"lineNum":"   38","line":"            .expectedContext = expectedContext,","class":"lineCov","hits":"1","order":"2704","possible_hits":"1",},
{"lineNum":"   39","line":"        };"},
{"lineNum":"   40","line":"    }"},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"    pub fn report(self: ContextError, writer: anytype) !void {","class":"linePartCov","hits":"2","order":"2718","possible_hits":"4",},
{"lineNum":"   43","line":"        try writer.print(","class":"linePartCov","hits":"1","order":"2723","possible_hits":"2",},
{"lineNum":"   44","line":"            \"Error: {d}:{d}: {s} cannot occur outside of {s}\\n\","},
{"lineNum":"   45","line":"            .{"},
{"lineNum":"   46","line":"                self.csr.ln,","class":"linePartCov","hits":"1","order":"2719","possible_hits":"2",},
{"lineNum":"   47","line":"                self.csr.ch,","class":"linePartCov","hits":"1","order":"2720","possible_hits":"2",},
{"lineNum":"   48","line":"                self.found,","class":"linePartCov","hits":"1","order":"2721","possible_hits":"2",},
{"lineNum":"   49","line":"                self.expectedContext,","class":"linePartCov","hits":"1","order":"2722","possible_hits":"2",},
{"lineNum":"   50","line":"            },"},
{"lineNum":"   51","line":"        );"},
{"lineNum":"   52","line":"    }"},
{"lineNum":"   53","line":"};"},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"test \"can initialize a ContextError\" {","class":"lineCov","hits":"2","order":"2873","possible_hits":"2",},
{"lineNum":"   56","line":"    const csr = Cursor.new(2, 5);","class":"lineCov","hits":"1","order":"2874","possible_hits":"1",},
{"lineNum":"   57","line":"    const found = \"Something\";"},
{"lineNum":"   58","line":"    const expectedContext = \"a context\";"},
{"lineNum":"   59","line":"    const err = ContextError.new(csr, found, expectedContext);","class":"lineCov","hits":"1","order":"2875","possible_hits":"1",},
{"lineNum":"   60","line":"    try expectEqual(csr, err.csr);","class":"lineCov","hits":"1","order":"2876","possible_hits":"1",},
{"lineNum":"   61","line":"    try expectEqualStrings(found, err.found);","class":"lineCov","hits":"1","order":"2877","possible_hits":"1",},
{"lineNum":"   62","line":"    try expectEqualStrings(expectedContext, err.expectedContext);","class":"lineCov","hits":"1","order":"2878","possible_hits":"1",},
{"lineNum":"   63","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-24 08:01:28", "instrumented" : 17, "covered" : 17,};
var merged_data = [];
