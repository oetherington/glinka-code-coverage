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
{"lineNum":"   21","line":"const Type = @import(\"../../common/types/type.zig\").Type;"},
{"lineNum":"   22","line":""},
{"lineNum":"   23","line":"pub const ReturnError = struct {"},
{"lineNum":"   24","line":"    csr: Cursor,"},
{"lineNum":"   25","line":"    expectedTy: Type.Ptr,"},
{"lineNum":"   26","line":"    actualTy: ?Type.Ptr,"},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"    pub fn new(","class":"lineCov","hits":"1","order":"2477","possible_hits":"1",},
{"lineNum":"   29","line":"        csr: Cursor,"},
{"lineNum":"   30","line":"        expectedTy: Type.Ptr,"},
{"lineNum":"   31","line":"        actualTy: ?Type.Ptr,"},
{"lineNum":"   32","line":"    ) ReturnError {"},
{"lineNum":"   33","line":"        return ReturnError{","class":"lineCov","hits":"1","order":"2481","possible_hits":"1",},
{"lineNum":"   34","line":"            .csr = csr,","class":"lineCov","hits":"1","order":"2478","possible_hits":"1",},
{"lineNum":"   35","line":"            .expectedTy = expectedTy,","class":"lineCov","hits":"1","order":"2479","possible_hits":"1",},
{"lineNum":"   36","line":"            .actualTy = actualTy,","class":"lineCov","hits":"1","order":"2480","possible_hits":"1",},
{"lineNum":"   37","line":"        };"},
{"lineNum":"   38","line":"    }"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"    pub fn report(self: ReturnError, writer: anytype) !void {","class":"linePartCov","hits":"2","order":"2493","possible_hits":"4",},
{"lineNum":"   41","line":"        if (self.expectedTy.getType() == .Void) {","class":"linePartCov","hits":"3","order":"2494","possible_hits":"6",},
{"lineNum":"   42","line":"            try writer.print(","class":"linePartCov","hits":"1","order":"5686","possible_hits":"2",},
{"lineNum":"   43","line":"                \"Error: {d}:{d}: Cannot return a value from a void function\","},
{"lineNum":"   44","line":"                .{ self.csr.ln, self.csr.ch },","class":"linePartCov","hits":"1","order":"5685","possible_hits":"2",},
{"lineNum":"   45","line":"            );"},
{"lineNum":"   46","line":"        } else if (self.actualTy) |actualTy| {","class":"linePartCov","hits":"2","order":"2495","possible_hits":"4",},
{"lineNum":"   47","line":"            try writer.print(","class":"linePartCov","hits":"1","order":"2497","possible_hits":"2",},
{"lineNum":"   48","line":"                \"Error: {d}:{d}: Cannot return a value of type \","},
{"lineNum":"   49","line":"                .{ self.csr.ln, self.csr.ch },","class":"linePartCov","hits":"1","order":"2496","possible_hits":"2",},
{"lineNum":"   50","line":"            );"},
{"lineNum":"   51","line":"            try actualTy.write(writer);","class":"linePartCov","hits":"1","order":"2498","possible_hits":"2",},
{"lineNum":"   52","line":"            try writer.print(\" from a function returning \", .{});","class":"linePartCov","hits":"1","order":"2499","possible_hits":"2",},
{"lineNum":"   53","line":"            try self.expectedTy.write(writer);","class":"linePartCov","hits":"1","order":"2500","possible_hits":"2",},
{"lineNum":"   54","line":"        } else {"},
{"lineNum":"   55","line":"            try writer.print(","class":"linePartCov","hits":"1","order":"5694","possible_hits":"2",},
{"lineNum":"   56","line":"                \"Error: {d}:{d}: Non-void function must return value of type \","},
{"lineNum":"   57","line":"                .{ self.csr.ln, self.csr.ch },","class":"linePartCov","hits":"1","order":"5693","possible_hits":"2",},
{"lineNum":"   58","line":"            );"},
{"lineNum":"   59","line":"            try self.expectedTy.write(writer);","class":"linePartCov","hits":"1","order":"5695","possible_hits":"2",},
{"lineNum":"   60","line":"        }"},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"        try writer.print(\"\\n\", .{});","class":"linePartCov","hits":"1","order":"2501","possible_hits":"2",},
{"lineNum":"   63","line":"    }"},
{"lineNum":"   64","line":"};"},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"test \"can initialize a ReturnError\" {","class":"lineCov","hits":"2","order":"2572","possible_hits":"2",},
{"lineNum":"   67","line":"    const csr = Cursor.new(2, 5);","class":"lineCov","hits":"1","order":"2573","possible_hits":"1",},
{"lineNum":"   68","line":"    const expectedTy = Type.newNumber();","class":"lineCov","hits":"1","order":"2574","possible_hits":"1",},
{"lineNum":"   69","line":"    const actualTy = Type.newString();","class":"lineCov","hits":"1","order":"2575","possible_hits":"1",},
{"lineNum":"   70","line":"    const err = ReturnError.new(csr, &expectedTy, &actualTy);","class":"lineCov","hits":"1","order":"2576","possible_hits":"1",},
{"lineNum":"   71","line":"    try expectEqual(csr, err.csr);","class":"lineCov","hits":"1","order":"2577","possible_hits":"1",},
{"lineNum":"   72","line":"    try expectEqual(&expectedTy, err.expectedTy);","class":"lineCov","hits":"1","order":"2578","possible_hits":"1",},
{"lineNum":"   73","line":"    try expectEqual(&actualTy, err.actualTy.?);","class":"linePartCov","hits":"1","order":"2579","possible_hits":"2",},
{"lineNum":"   74","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-13 15:59:30", "instrumented" : 27, "covered" : 27,};
var merged_data = [];
