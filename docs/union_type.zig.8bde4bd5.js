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
{"lineNum":"   21","line":"pub const UnionType = struct {"},
{"lineNum":"   22","line":"    tys: []Type.Ptr,"},
{"lineNum":"   23","line":""},
{"lineNum":"   24","line":"    pub fn new(tys: []Type.Ptr) UnionType {","class":"lineCov","hits":"1","order":"1648","possible_hits":"1",},
{"lineNum":"   25","line":"        return UnionType{","class":"lineCov","hits":"1","order":"1650","possible_hits":"1",},
{"lineNum":"   26","line":"            .tys = tys,","class":"lineCov","hits":"1","order":"1649","possible_hits":"1",},
{"lineNum":"   27","line":"        };"},
{"lineNum":"   28","line":"    }"},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"    pub fn hash(self: UnionType) usize {","class":"lineCov","hits":"1","order":"1653","possible_hits":"1",},
{"lineNum":"   31","line":"        var result: usize = 0xc55d0505bb5a5d99;","class":"lineCov","hits":"1","order":"1654","possible_hits":"1",},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"        for (self.tys) |ty|","class":"lineCov","hits":"2","order":"1655","possible_hits":"2",},
{"lineNum":"   34","line":"            result ^= ty.hash();","class":"lineCov","hits":"1","order":"1656","possible_hits":"1",},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"        return result;","class":"lineCov","hits":"1","order":"1657","possible_hits":"1",},
{"lineNum":"   37","line":"    }"},
{"lineNum":"   38","line":""},
{"lineNum":"   39","line":"    pub fn contains(self: UnionType, ty: Type.Ptr) bool {"},
{"lineNum":"   40","line":"        for (self.tys) |t|"},
{"lineNum":"   41","line":"            if (t == ty)"},
{"lineNum":"   42","line":"                return true;"},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"        return false;"},
{"lineNum":"   45","line":"    }"},
{"lineNum":"   46","line":""},
{"lineNum":"   47","line":"    pub fn write(self: UnionType, writer: anytype) !void {","class":"linePartCov","hits":"2","order":"1384","possible_hits":"4",},
{"lineNum":"   48","line":"        var prefix: []const u8 = \"\";","class":"linePartCov","hits":"1","order":"1385","possible_hits":"2",},
{"lineNum":"   49","line":"        for (self.tys) |ty| {","class":"linePartCov","hits":"2","order":"1386","possible_hits":"4",},
{"lineNum":"   50","line":"            try writer.print(\"{s}\", .{prefix});","class":"linePartCov","hits":"1","order":"1387","possible_hits":"2",},
{"lineNum":"   51","line":"            try ty.write(writer);","class":"linePartCov","hits":"1","order":"1388","possible_hits":"2",},
{"lineNum":"   52","line":"            prefix = \"|\";","class":"linePartCov","hits":"1","order":"1389","possible_hits":"2",},
{"lineNum":"   53","line":"        }"},
{"lineNum":"   54","line":"    }"},
{"lineNum":"   55","line":"};"},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"test \"can hash a UnionType\" {","class":"lineCov","hits":"2","order":"1643","possible_hits":"2",},
{"lineNum":"   58","line":"    const num = Type.newNumber();","class":"lineCov","hits":"1","order":"1644","possible_hits":"1",},
{"lineNum":"   59","line":"    const str = Type.newString();","class":"lineCov","hits":"1","order":"1645","possible_hits":"1",},
{"lineNum":"   60","line":"    const never = Type.newNever();","class":"lineCov","hits":"1","order":"1646","possible_hits":"1",},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"    const a = UnionType.new(&[_]Type.Ptr{ &num, &str });","class":"lineCov","hits":"1","order":"1647","possible_hits":"1",},
{"lineNum":"   63","line":"    const b = UnionType.new(&[_]Type.Ptr{ &num, &never });","class":"lineCov","hits":"1","order":"1651","possible_hits":"1",},
{"lineNum":"   64","line":""},
{"lineNum":"   65","line":"    try std.testing.expectEqual(a.hash(), a.hash());","class":"lineCov","hits":"1","order":"1652","possible_hits":"1",},
{"lineNum":"   66","line":"    try std.testing.expect(a.hash() != b.hash());","class":"lineCov","hits":"1","order":"1658","possible_hits":"1",},
{"lineNum":"   67","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-13 15:43:06", "instrumented" : 22, "covered" : 22,};
var merged_data = [];
