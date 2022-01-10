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
{"lineNum":"   20","line":"const Cursor = @import(\"../../common/cursor.zig\").Cursor;"},
{"lineNum":"   21","line":"const TokenType = @import(\"../../common/token.zig\").Token.Type;"},
{"lineNum":"   22","line":"const Type = @import(\"../../common/types/type.zig\").Type;"},
{"lineNum":"   23","line":""},
{"lineNum":"   24","line":"pub const AssignError = struct {"},
{"lineNum":"   25","line":"    csr: Cursor,"},
{"lineNum":"   26","line":"    left: Type.Ptr,"},
{"lineNum":"   27","line":"    right: Type.Ptr,"},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"    pub fn new(csr: Cursor, left: Type.Ptr, right: Type.Ptr) AssignError {","class":"lineCov","hits":"1","order":"2521","possible_hits":"1",},
{"lineNum":"   30","line":"        return AssignError{","class":"lineCov","hits":"1","order":"2525","possible_hits":"1",},
{"lineNum":"   31","line":"            .csr = csr,","class":"lineCov","hits":"1","order":"2522","possible_hits":"1",},
{"lineNum":"   32","line":"            .left = left,","class":"lineCov","hits":"1","order":"2523","possible_hits":"1",},
{"lineNum":"   33","line":"            .right = right,","class":"lineCov","hits":"1","order":"2524","possible_hits":"1",},
{"lineNum":"   34","line":"        };"},
{"lineNum":"   35","line":"    }"},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"    pub fn report(self: AssignError, writer: anytype) !void {","class":"linePartCov","hits":"2","order":"2537","possible_hits":"4",},
{"lineNum":"   38","line":"        try writer.print(","class":"linePartCov","hits":"1","order":"2539","possible_hits":"2",},
{"lineNum":"   39","line":"            \"Error: {d}:{d}: Value of type \","},
{"lineNum":"   40","line":"            .{ self.csr.ln, self.csr.ch },","class":"linePartCov","hits":"1","order":"2538","possible_hits":"2",},
{"lineNum":"   41","line":"        );"},
{"lineNum":"   42","line":"        try self.right.write(writer);","class":"linePartCov","hits":"1","order":"2540","possible_hits":"2",},
{"lineNum":"   43","line":"        try writer.print(\" cannot be assigned to a variable of type \", .{});","class":"linePartCov","hits":"1","order":"2541","possible_hits":"2",},
{"lineNum":"   44","line":"        try self.left.write(writer);","class":"linePartCov","hits":"1","order":"2542","possible_hits":"2",},
{"lineNum":"   45","line":"        try writer.print(\"\\n\", .{});","class":"linePartCov","hits":"1","order":"2543","possible_hits":"2",},
{"lineNum":"   46","line":"    }"},
{"lineNum":"   47","line":"};"},
{"lineNum":"   48","line":""},
{"lineNum":"   49","line":"test \"can initialize an AssignError\" {","class":"lineCov","hits":"2","order":"2636","possible_hits":"2",},
{"lineNum":"   50","line":"    const csr = Cursor.new(2, 5);","class":"lineCov","hits":"1","order":"2637","possible_hits":"1",},
{"lineNum":"   51","line":"    const left = Type.newString();","class":"lineCov","hits":"1","order":"2638","possible_hits":"1",},
{"lineNum":"   52","line":"    const right = Type.newNumber();","class":"lineCov","hits":"1","order":"2639","possible_hits":"1",},
{"lineNum":"   53","line":"    const err = AssignError.new(csr, &left, &right);","class":"lineCov","hits":"1","order":"2640","possible_hits":"1",},
{"lineNum":"   54","line":"    try expectEqual(csr, err.csr);","class":"lineCov","hits":"1","order":"2641","possible_hits":"1",},
{"lineNum":"   55","line":"    try expectEqual(&left, err.left);","class":"lineCov","hits":"1","order":"2642","possible_hits":"1",},
{"lineNum":"   56","line":"    try expectEqual(&right, err.right);","class":"lineCov","hits":"1","order":"2643","possible_hits":"1",},
{"lineNum":"   57","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-10 07:49:02", "instrumented" : 20, "covered" : 20,};
var merged_data = [];
