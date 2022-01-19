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
{"lineNum":"   24","line":""},
{"lineNum":"   25","line":"    pub fn new(ret: Type.Ptr, args: []Type.Ptr) FunctionType {","class":"lineCov","hits":"1","order":"2146","possible_hits":"1",},
{"lineNum":"   26","line":"        return FunctionType{","class":"lineCov","hits":"1","order":"2149","possible_hits":"1",},
{"lineNum":"   27","line":"            .ret = ret,","class":"lineCov","hits":"1","order":"2147","possible_hits":"1",},
{"lineNum":"   28","line":"            .args = args,","class":"lineCov","hits":"1","order":"2148","possible_hits":"1",},
{"lineNum":"   29","line":"        };"},
{"lineNum":"   30","line":"    }"},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"    pub fn hash(self: FunctionType) usize {","class":"lineCov","hits":"1","order":"311","possible_hits":"1",},
{"lineNum":"   33","line":"        var result: usize = self.ret.hash() ^ 0xd35558c29b7438aa;","class":"lineCov","hits":"1","order":"312","possible_hits":"1",},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"        for (self.args) |arg, index|","class":"lineCov","hits":"2","order":"313","possible_hits":"2",},
{"lineNum":"   36","line":"            result ^= arg.hash() >> @intCast(u6, index + 1);","class":"linePartCov","hits":"1","order":"314","possible_hits":"3",},
{"lineNum":"   37","line":""},
{"lineNum":"   38","line":"        return result;","class":"lineCov","hits":"1","order":"315","possible_hits":"1",},
{"lineNum":"   39","line":"    }"},
{"lineNum":"   40","line":""},
{"lineNum":"   41","line":"    pub fn write(self: FunctionType, writer: anytype) !void {","class":"linePartCov","hits":"2","order":"1998","possible_hits":"4",},
{"lineNum":"   42","line":"        try writer.print(\"function(\", .{});","class":"linePartCov","hits":"1","order":"1999","possible_hits":"2",},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"        var prefix: []const u8 = \"\";","class":"linePartCov","hits":"1","order":"2000","possible_hits":"2",},
{"lineNum":"   45","line":"        for (self.args) |arg| {","class":"linePartCov","hits":"2","order":"2001","possible_hits":"4",},
{"lineNum":"   46","line":"            try writer.print(\"{s}\", .{prefix});","class":"linePartCov","hits":"1","order":"2002","possible_hits":"2",},
{"lineNum":"   47","line":"            try arg.write(writer);","class":"linePartCov","hits":"1","order":"2003","possible_hits":"2",},
{"lineNum":"   48","line":"            prefix = \", \";","class":"linePartCov","hits":"1","order":"2004","possible_hits":"2",},
{"lineNum":"   49","line":"        }"},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"        try writer.print(\") : \", .{});","class":"linePartCov","hits":"1","order":"2005","possible_hits":"2",},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"        try self.ret.write(writer);","class":"linePartCov","hits":"1","order":"2006","possible_hits":"2",},
{"lineNum":"   54","line":"    }"},
{"lineNum":"   55","line":"};"},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"test \"can hash a FunctionType\" {","class":"lineCov","hits":"2","order":"2142","possible_hits":"2",},
{"lineNum":"   58","line":"    const num = Type.newNumber();","class":"lineCov","hits":"1","order":"2143","possible_hits":"1",},
{"lineNum":"   59","line":"    const str = Type.newString();","class":"lineCov","hits":"1","order":"2144","possible_hits":"1",},
{"lineNum":"   60","line":""},
{"lineNum":"   61","line":"    const a = FunctionType.new(&num, &[_]Type.Ptr{&str});","class":"lineCov","hits":"1","order":"2145","possible_hits":"1",},
{"lineNum":"   62","line":"    const b = FunctionType.new(&str, &[_]Type.Ptr{&num});","class":"lineCov","hits":"1","order":"2150","possible_hits":"1",},
{"lineNum":"   63","line":""},
{"lineNum":"   64","line":"    try std.testing.expectEqual(a.hash(), a.hash());","class":"lineCov","hits":"1","order":"2151","possible_hits":"1",},
{"lineNum":"   65","line":"    try std.testing.expect(a.hash() != b.hash());","class":"lineCov","hits":"1","order":"2152","possible_hits":"1",},
{"lineNum":"   66","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-19 21:06:17", "instrumented" : 25, "covered" : 25,};
var merged_data = [];
