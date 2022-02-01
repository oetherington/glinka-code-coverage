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
{"lineNum":"   21","line":"pub const ArrayType = struct {"},
{"lineNum":"   22","line":"    subtype: Type.Ptr,"},
{"lineNum":"   23","line":""},
{"lineNum":"   24","line":"    pub fn new(subtype: Type.Ptr) ArrayType {","class":"lineCov","hits":"1","order":"1664","possible_hits":"1",},
{"lineNum":"   25","line":"        return ArrayType{","class":"lineCov","hits":"1","order":"1666","possible_hits":"1",},
{"lineNum":"   26","line":"            .subtype = subtype,","class":"lineCov","hits":"1","order":"1665","possible_hits":"1",},
{"lineNum":"   27","line":"        };"},
{"lineNum":"   28","line":"    }"},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"    pub fn hash(self: ArrayType) usize {","class":"lineCov","hits":"1","order":"1753","possible_hits":"1",},
{"lineNum":"   31","line":"        return self.subtype.hash() ^ 0x54915bee0f3e544b;","class":"lineCov","hits":"1","order":"1754","possible_hits":"1",},
{"lineNum":"   32","line":"    }"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"    pub fn write(self: ArrayType, writer: anytype) !void {","class":"linePartCov","hits":"2","order":"1953","possible_hits":"4",},
{"lineNum":"   35","line":"        if (self.subtype.getType() == .Union) {","class":"linePartCov","hits":"2","order":"1954","possible_hits":"4",},
{"lineNum":"   36","line":"            try writer.print(\"(\", .{});","class":"linePartCov","hits":"1","order":"1965","possible_hits":"2",},
{"lineNum":"   37","line":"            try self.subtype.write(writer);","class":"linePartCov","hits":"1","order":"1966","possible_hits":"2",},
{"lineNum":"   38","line":"            try writer.print(\")[]\", .{});","class":"linePartCov","hits":"1","order":"1974","possible_hits":"2",},
{"lineNum":"   39","line":"        } else {"},
{"lineNum":"   40","line":"            try self.subtype.write(writer);","class":"linePartCov","hits":"1","order":"1955","possible_hits":"2",},
{"lineNum":"   41","line":"            try writer.print(\"[]\", .{});","class":"linePartCov","hits":"1","order":"1956","possible_hits":"2",},
{"lineNum":"   42","line":"        }"},
{"lineNum":"   43","line":"    }"},
{"lineNum":"   44","line":"};"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"test \"can hash an ArrayType\" {","class":"lineCov","hits":"2","order":"2046","possible_hits":"2",},
{"lineNum":"   47","line":"    const str = Type.newString();","class":"lineCov","hits":"1","order":"2047","possible_hits":"1",},
{"lineNum":"   48","line":"    const num = Type.newNumber();","class":"lineCov","hits":"1","order":"2048","possible_hits":"1",},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":"    const a = ArrayType.new(&str);","class":"lineCov","hits":"1","order":"2049","possible_hits":"1",},
{"lineNum":"   51","line":"    const b = ArrayType.new(&num);","class":"lineCov","hits":"1","order":"2050","possible_hits":"1",},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"    try std.testing.expectEqual(a.hash(), a.hash());","class":"lineCov","hits":"1","order":"2051","possible_hits":"1",},
{"lineNum":"   54","line":"    try std.testing.expect(a.hash() != b.hash());","class":"lineCov","hits":"1","order":"2052","possible_hits":"1",},
{"lineNum":"   55","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-01 20:02:57", "instrumented" : 19, "covered" : 19,};
var merged_data = [];
