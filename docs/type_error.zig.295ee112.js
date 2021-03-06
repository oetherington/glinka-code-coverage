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
{"lineNum":"   23","line":"pub const TypeError = struct {"},
{"lineNum":"   24","line":"    csr: Cursor,"},
{"lineNum":"   25","line":"    valueTy: Type.Ptr,"},
{"lineNum":"   26","line":"    targetTy: Type.Ptr,"},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"    pub fn new(csr: Cursor, valueTy: Type.Ptr, targetTy: Type.Ptr) TypeError {","class":"lineCov","hits":"1","order":"2318","possible_hits":"1",},
{"lineNum":"   29","line":"        return TypeError{","class":"lineCov","hits":"1","order":"2322","possible_hits":"1",},
{"lineNum":"   30","line":"            .csr = csr,","class":"lineCov","hits":"1","order":"2319","possible_hits":"1",},
{"lineNum":"   31","line":"            .valueTy = valueTy,","class":"lineCov","hits":"1","order":"2320","possible_hits":"1",},
{"lineNum":"   32","line":"            .targetTy = targetTy,","class":"lineCov","hits":"1","order":"2321","possible_hits":"1",},
{"lineNum":"   33","line":"        };"},
{"lineNum":"   34","line":"    }"},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"    pub fn report(self: TypeError, writer: anytype) !void {","class":"linePartCov","hits":"2","order":"2336","possible_hits":"4",},
{"lineNum":"   37","line":"        try writer.print(\"Type Error: {d}:{d}: The type \", .{","class":"linePartCov","hits":"1","order":"2339","possible_hits":"2",},
{"lineNum":"   38","line":"            self.csr.ln,","class":"linePartCov","hits":"1","order":"2337","possible_hits":"2",},
{"lineNum":"   39","line":"            self.csr.ch,","class":"linePartCov","hits":"1","order":"2338","possible_hits":"2",},
{"lineNum":"   40","line":"        });"},
{"lineNum":"   41","line":"        try self.valueTy.write(writer);","class":"linePartCov","hits":"1","order":"2340","possible_hits":"2",},
{"lineNum":"   42","line":"        try writer.print(\" is not coercable to the type \", .{});","class":"linePartCov","hits":"1","order":"2341","possible_hits":"2",},
{"lineNum":"   43","line":"        try self.targetTy.write(writer);","class":"linePartCov","hits":"1","order":"2342","possible_hits":"2",},
{"lineNum":"   44","line":"        try writer.print(\"\\n\", .{});","class":"linePartCov","hits":"1","order":"2343","possible_hits":"2",},
{"lineNum":"   45","line":"    }"},
{"lineNum":"   46","line":"};"},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"test \"can initialize a TypeError\" {","class":"lineCov","hits":"2","order":"2531","possible_hits":"2",},
{"lineNum":"   49","line":"    const csr = Cursor.new(2, 5);","class":"lineCov","hits":"1","order":"2532","possible_hits":"1",},
{"lineNum":"   50","line":"    const valueTy = Type.newNumber();","class":"lineCov","hits":"1","order":"2533","possible_hits":"1",},
{"lineNum":"   51","line":"    const targetTy = Type.newString();","class":"lineCov","hits":"1","order":"2534","possible_hits":"1",},
{"lineNum":"   52","line":"    const err = TypeError.new(csr, &valueTy, &targetTy);","class":"lineCov","hits":"1","order":"2535","possible_hits":"1",},
{"lineNum":"   53","line":"    try expectEqual(csr, err.csr);","class":"lineCov","hits":"1","order":"2536","possible_hits":"1",},
{"lineNum":"   54","line":"    try expectEqual(&valueTy, err.valueTy);","class":"lineCov","hits":"1","order":"2537","possible_hits":"1",},
{"lineNum":"   55","line":"    try expectEqual(&targetTy, err.targetTy);","class":"lineCov","hits":"1","order":"2538","possible_hits":"1",},
{"lineNum":"   56","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-13 15:59:30", "instrumented" : 21, "covered" : 21,};
var merged_data = [];
