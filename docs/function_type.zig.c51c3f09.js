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
{"lineNum":"   19","line":"const Type = @import(\"type.zig\").Type;"},
{"lineNum":"   20","line":""},
{"lineNum":"   21","line":"pub const FunctionType = struct {"},
{"lineNum":"   22","line":"    ret: Type.Ptr,"},
{"lineNum":"   23","line":"    args: []Type.Ptr,"},
{"lineNum":"   24","line":"    isConstructable: bool,"},
{"lineNum":"   25","line":""},
{"lineNum":"   26","line":"    pub fn new(","class":"lineCov","hits":"1","order":"1075","possible_hits":"1",},
{"lineNum":"   27","line":"        ret: Type.Ptr,"},
{"lineNum":"   28","line":"        args: []Type.Ptr,"},
{"lineNum":"   29","line":"        isConstructable: bool,"},
{"lineNum":"   30","line":"    ) FunctionType {"},
{"lineNum":"   31","line":"        return FunctionType{","class":"lineCov","hits":"1","order":"1079","possible_hits":"1",},
{"lineNum":"   32","line":"            .ret = ret,","class":"lineCov","hits":"1","order":"1076","possible_hits":"1",},
{"lineNum":"   33","line":"            .args = args,","class":"lineCov","hits":"1","order":"1077","possible_hits":"1",},
{"lineNum":"   34","line":"            .isConstructable = isConstructable,","class":"lineCov","hits":"1","order":"1078","possible_hits":"1",},
{"lineNum":"   35","line":"        };"},
{"lineNum":"   36","line":"    }"},
{"lineNum":"   37","line":""},
{"lineNum":"   38","line":"    pub fn hash(self: FunctionType) usize {","class":"lineCov","hits":"1","order":"1148","possible_hits":"1",},
{"lineNum":"   39","line":"        var result: usize = self.ret.hash() ^ 0xd35558c29b7438aa;","class":"lineCov","hits":"1","order":"1149","possible_hits":"1",},
{"lineNum":"   40","line":""},
{"lineNum":"   41","line":"        for (self.args) |arg, index|","class":"lineCov","hits":"2","order":"1150","possible_hits":"2",},
{"lineNum":"   42","line":"            result ^= arg.hash() >> @intCast(u6, index + 1);","class":"linePartCov","hits":"1","order":"1151","possible_hits":"3",},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"        return if (self.isConstructable) ~result else result;","class":"lineCov","hits":"1","order":"1152","possible_hits":"1",},
{"lineNum":"   45","line":"    }"},
{"lineNum":"   46","line":""},
{"lineNum":"   47","line":"    pub fn write(self: FunctionType, writer: anytype) !void {","class":"linePartCov","hits":"2","order":"1407","possible_hits":"4",},
{"lineNum":"   48","line":"        try writer.print(\"function(\", .{});","class":"linePartCov","hits":"1","order":"1408","possible_hits":"2",},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":"        var prefix: []const u8 = \"\";","class":"linePartCov","hits":"1","order":"1409","possible_hits":"2",},
{"lineNum":"   51","line":"        for (self.args) |arg| {","class":"linePartCov","hits":"2","order":"1410","possible_hits":"4",},
{"lineNum":"   52","line":"            try writer.print(\"{s}\", .{prefix});","class":"linePartCov","hits":"1","order":"1411","possible_hits":"2",},
{"lineNum":"   53","line":"            try arg.write(writer);","class":"linePartCov","hits":"1","order":"1412","possible_hits":"2",},
{"lineNum":"   54","line":"            prefix = \", \";","class":"linePartCov","hits":"1","order":"1413","possible_hits":"2",},
{"lineNum":"   55","line":"        }"},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"        try writer.print(\") : \", .{});","class":"linePartCov","hits":"1","order":"1414","possible_hits":"2",},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"        try self.ret.write(writer);","class":"linePartCov","hits":"1","order":"1415","possible_hits":"2",},
{"lineNum":"   60","line":"    }"},
{"lineNum":"   61","line":"};"},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"test \"can hash a FunctionType\" {","class":"lineCov","hits":"2","order":"1575","possible_hits":"2",},
{"lineNum":"   64","line":"    const num = Type.newNumber();","class":"lineCov","hits":"1","order":"1576","possible_hits":"1",},
{"lineNum":"   65","line":"    const str = Type.newString();","class":"lineCov","hits":"1","order":"1577","possible_hits":"1",},
{"lineNum":"   66","line":""},
{"lineNum":"   67","line":"    const a = FunctionType.new(&num, &[_]Type.Ptr{&str}, false);","class":"lineCov","hits":"1","order":"1578","possible_hits":"1",},
{"lineNum":"   68","line":"    const b = FunctionType.new(&str, &[_]Type.Ptr{&num}, false);","class":"lineCov","hits":"1","order":"1579","possible_hits":"1",},
{"lineNum":"   69","line":"    const c = FunctionType.new(&num, &[_]Type.Ptr{&str}, true);","class":"lineCov","hits":"1","order":"1580","possible_hits":"1",},
{"lineNum":"   70","line":""},
{"lineNum":"   71","line":"    try std.testing.expectEqual(a.hash(), a.hash());","class":"lineCov","hits":"1","order":"1581","possible_hits":"1",},
{"lineNum":"   72","line":"    try std.testing.expect(a.hash() != b.hash());","class":"lineCov","hits":"1","order":"1582","possible_hits":"1",},
{"lineNum":"   73","line":"    try std.testing.expect(a.hash() != c.hash());","class":"lineCov","hits":"1","order":"1583","possible_hits":"1",},
{"lineNum":"   74","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-03 18:43:36", "instrumented" : 28, "covered" : 28,};
var merged_data = [];
