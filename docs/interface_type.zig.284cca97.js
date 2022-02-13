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
{"lineNum":"   19","line":"const genericEql = @import(\"../generic_eql.zig\").eql;"},
{"lineNum":"   20","line":"const Type = @import(\"type.zig\").Type;"},
{"lineNum":"   21","line":""},
{"lineNum":"   22","line":"pub const InterfaceType = struct {"},
{"lineNum":"   23","line":"    pub const Member = struct {"},
{"lineNum":"   24","line":"        name: []const u8,"},
{"lineNum":"   25","line":"        ty: Type.Ptr,"},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"        pub fn eql(a: Member, b: Member) bool {","class":"lineCov","hits":"1","order":"1694","possible_hits":"1",},
{"lineNum":"   28","line":"            return genericEql(a, b);","class":"lineCov","hits":"1","order":"1695","possible_hits":"1",},
{"lineNum":"   29","line":"        }"},
{"lineNum":"   30","line":"    };"},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"    members: []Member,"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"    pub fn new(members: []Member) InterfaceType {","class":"lineCov","hits":"1","order":"1097","possible_hits":"1",},
{"lineNum":"   35","line":"        return InterfaceType{","class":"lineCov","hits":"1","order":"1099","possible_hits":"1",},
{"lineNum":"   36","line":"            .members = members,","class":"lineCov","hits":"1","order":"1098","possible_hits":"1",},
{"lineNum":"   37","line":"        };"},
{"lineNum":"   38","line":"    }"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"    pub fn hash(self: InterfaceType) usize {","class":"lineCov","hits":"1","order":"1713","possible_hits":"1",},
{"lineNum":"   41","line":"        var result: usize = 0xe75f7630fbf1ff65;","class":"lineCov","hits":"1","order":"1714","possible_hits":"1",},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"        for (self.members) |mem|","class":"lineCov","hits":"2","order":"1715","possible_hits":"2",},
{"lineNum":"   44","line":"            result ^= std.hash.Wyhash.hash(0, mem.name) ^ @ptrToInt(mem.ty);","class":"lineCov","hits":"1","order":"1716","possible_hits":"1",},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"        return result;","class":"lineCov","hits":"1","order":"1717","possible_hits":"1",},
{"lineNum":"   47","line":"    }"},
{"lineNum":"   48","line":""},
{"lineNum":"   49","line":"    pub fn write(self: InterfaceType, writer: anytype) !void {","class":"linePartCov","hits":"2","order":"1454","possible_hits":"4",},
{"lineNum":"   50","line":"        try writer.print(\"{{ \", .{});","class":"linePartCov","hits":"1","order":"1455","possible_hits":"2",},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"        for (self.members) |mem| {","class":"linePartCov","hits":"2","order":"1456","possible_hits":"4",},
{"lineNum":"   53","line":"            try writer.print(\"{s}: \", .{mem.name});","class":"linePartCov","hits":"1","order":"1457","possible_hits":"2",},
{"lineNum":"   54","line":"            try mem.ty.write(writer);","class":"linePartCov","hits":"1","order":"1458","possible_hits":"2",},
{"lineNum":"   55","line":"            try writer.print(\", \", .{});","class":"linePartCov","hits":"1","order":"1459","possible_hits":"2",},
{"lineNum":"   56","line":"        }"},
{"lineNum":"   57","line":""},
{"lineNum":"   58","line":"        try writer.print(\"}}\", .{});","class":"linePartCov","hits":"1","order":"1460","possible_hits":"2",},
{"lineNum":"   59","line":"    }"},
{"lineNum":"   60","line":""},
{"lineNum":"   61","line":"    pub fn getNamedMember(","class":"lineCov","hits":"1","order":"1727","possible_hits":"1",},
{"lineNum":"   62","line":"        self: InterfaceType,"},
{"lineNum":"   63","line":"        name: []const u8,"},
{"lineNum":"   64","line":"    ) ?Member {"},
{"lineNum":"   65","line":"        for (self.members) |member|","class":"lineCov","hits":"2","order":"1728","possible_hits":"2",},
{"lineNum":"   66","line":"            if (std.mem.eql(u8, member.name, name))","class":"lineCov","hits":"2","order":"1729","possible_hits":"2",},
{"lineNum":"   67","line":"                return member;","class":"lineCov","hits":"1","order":"1730","possible_hits":"1",},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"        return null;","class":"lineCov","hits":"1","order":"1739","possible_hits":"1",},
{"lineNum":"   70","line":"    }"},
{"lineNum":"   71","line":""},
{"lineNum":"   72","line":"    pub fn isAssignableTo(self: InterfaceType, target: InterfaceType) bool {","class":"lineCov","hits":"1","order":"1756","possible_hits":"1",},
{"lineNum":"   73","line":"        for (target.members) |member| {","class":"lineCov","hits":"2","order":"1757","possible_hits":"2",},
{"lineNum":"   74","line":"            const local = self.getNamedMember(member.name);","class":"lineCov","hits":"1","order":"1758","possible_hits":"1",},
{"lineNum":"   75","line":"            if (local) |local_| {","class":"lineCov","hits":"2","order":"1759","possible_hits":"2",},
{"lineNum":"   76","line":"                if (!local_.ty.isAssignableTo(member.ty))","class":"lineCov","hits":"2","order":"1760","possible_hits":"2",},
{"lineNum":"   77","line":"                    return false;","class":"lineCov","hits":"1","order":"1769","possible_hits":"1",},
{"lineNum":"   78","line":"            } else {"},
{"lineNum":"   79","line":"                return false;","class":"lineCov","hits":"1","order":"1763","possible_hits":"1",},
{"lineNum":"   80","line":"            }"},
{"lineNum":"   81","line":"        }"},
{"lineNum":"   82","line":""},
{"lineNum":"   83","line":"        return true;","class":"lineCov","hits":"1","order":"1761","possible_hits":"1",},
{"lineNum":"   84","line":"    }"},
{"lineNum":"   85","line":"};"},
{"lineNum":"   86","line":""},
{"lineNum":"   87","line":"test \"can check InterfaceType.Member equality\" {","class":"lineCov","hits":"2","order":"1686","possible_hits":"2",},
{"lineNum":"   88","line":"    const number = Type.newNumber();","class":"lineCov","hits":"1","order":"1687","possible_hits":"1",},
{"lineNum":"   89","line":"    const boolean = Type.newBoolean();","class":"lineCov","hits":"1","order":"1688","possible_hits":"1",},
{"lineNum":"   90","line":"    const a = InterfaceType.Member{ .name = \"a\", .ty = &number };","class":"lineCov","hits":"1","order":"1689","possible_hits":"1",},
{"lineNum":"   91","line":"    const b = InterfaceType.Member{ .name = \"a\", .ty = &number };","class":"lineCov","hits":"1","order":"1690","possible_hits":"1",},
{"lineNum":"   92","line":"    const c = InterfaceType.Member{ .name = \"b\", .ty = &number };","class":"lineCov","hits":"1","order":"1691","possible_hits":"1",},
{"lineNum":"   93","line":"    const d = InterfaceType.Member{ .name = \"a\", .ty = &boolean };","class":"lineCov","hits":"1","order":"1692","possible_hits":"1",},
{"lineNum":"   94","line":""},
{"lineNum":"   95","line":"    try std.testing.expect(a.eql(a));","class":"lineCov","hits":"1","order":"1693","possible_hits":"1",},
{"lineNum":"   96","line":"    try std.testing.expect(a.eql(b));","class":"lineCov","hits":"1","order":"1696","possible_hits":"1",},
{"lineNum":"   97","line":"    try std.testing.expect(!a.eql(c));","class":"lineCov","hits":"1","order":"1697","possible_hits":"1",},
{"lineNum":"   98","line":"    try std.testing.expect(!a.eql(d));","class":"lineCov","hits":"1","order":"1698","possible_hits":"1",},
{"lineNum":"   99","line":"}"},
{"lineNum":"  100","line":""},
{"lineNum":"  101","line":"test \"can hash an InterfaceType\" {","class":"lineCov","hits":"2","order":"1699","possible_hits":"2",},
{"lineNum":"  102","line":"    const num = Type.newNumber();","class":"lineCov","hits":"1","order":"1700","possible_hits":"1",},
{"lineNum":"  103","line":"    const str = Type.newString();","class":"lineCov","hits":"1","order":"1701","possible_hits":"1",},
{"lineNum":"  104","line":"    const never = Type.newNever();","class":"lineCov","hits":"1","order":"1702","possible_hits":"1",},
{"lineNum":"  105","line":""},
{"lineNum":"  106","line":"    const a = Type.InterfaceType.new(&[_]Type.InterfaceType.Member{","class":"lineCov","hits":"1","order":"1705","possible_hits":"1",},
{"lineNum":"  107","line":"        Type.InterfaceType.Member{ .name = \"a\", .ty = &num },","class":"lineCov","hits":"1","order":"1703","possible_hits":"1",},
{"lineNum":"  108","line":"        Type.InterfaceType.Member{ .name = \"b\", .ty = &str },","class":"lineCov","hits":"1","order":"1704","possible_hits":"1",},
{"lineNum":"  109","line":"    });"},
{"lineNum":"  110","line":"    const b = Type.InterfaceType.new(&[_]Type.InterfaceType.Member{","class":"lineCov","hits":"1","order":"1708","possible_hits":"1",},
{"lineNum":"  111","line":"        Type.InterfaceType.Member{ .name = \"b\", .ty = &str },","class":"lineCov","hits":"1","order":"1706","possible_hits":"1",},
{"lineNum":"  112","line":"        Type.InterfaceType.Member{ .name = \"a\", .ty = &num },","class":"lineCov","hits":"1","order":"1707","possible_hits":"1",},
{"lineNum":"  113","line":"    });"},
{"lineNum":"  114","line":"    const c = Type.InterfaceType.new(&[_]Type.InterfaceType.Member{","class":"lineCov","hits":"1","order":"1711","possible_hits":"1",},
{"lineNum":"  115","line":"        Type.InterfaceType.Member{ .name = \"a\", .ty = &num },","class":"lineCov","hits":"1","order":"1709","possible_hits":"1",},
{"lineNum":"  116","line":"        Type.InterfaceType.Member{ .name = \"b\", .ty = &never },","class":"lineCov","hits":"1","order":"1710","possible_hits":"1",},
{"lineNum":"  117","line":"    });"},
{"lineNum":"  118","line":""},
{"lineNum":"  119","line":"    try std.testing.expectEqual(a.hash(), a.hash());","class":"lineCov","hits":"1","order":"1712","possible_hits":"1",},
{"lineNum":"  120","line":"    try std.testing.expectEqual(a.hash(), b.hash());","class":"lineCov","hits":"1","order":"1718","possible_hits":"1",},
{"lineNum":"  121","line":"    try std.testing.expect(a.hash() != c.hash());","class":"lineCov","hits":"1","order":"1719","possible_hits":"1",},
{"lineNum":"  122","line":"}"},
{"lineNum":"  123","line":""},
{"lineNum":"  124","line":"test \"can retrieve InterfaceType member by name\" {","class":"lineCov","hits":"2","order":"1720","possible_hits":"2",},
{"lineNum":"  125","line":"    const num = Type.newNumber();","class":"lineCov","hits":"1","order":"1721","possible_hits":"1",},
{"lineNum":"  126","line":"    const str = Type.newString();","class":"lineCov","hits":"1","order":"1722","possible_hits":"1",},
{"lineNum":"  127","line":""},
{"lineNum":"  128","line":"    const in = Type.InterfaceType.new(&[_]Type.InterfaceType.Member{","class":"lineCov","hits":"1","order":"1725","possible_hits":"1",},
{"lineNum":"  129","line":"        Type.InterfaceType.Member{ .name = \"a\", .ty = &num },","class":"lineCov","hits":"1","order":"1723","possible_hits":"1",},
{"lineNum":"  130","line":"        Type.InterfaceType.Member{ .name = \"b\", .ty = &str },","class":"lineCov","hits":"1","order":"1724","possible_hits":"1",},
{"lineNum":"  131","line":"    });"},
{"lineNum":"  132","line":""},
{"lineNum":"  133","line":"    const a = in.getNamedMember(\"a\");","class":"lineCov","hits":"1","order":"1726","possible_hits":"1",},
{"lineNum":"  134","line":"    try std.testing.expect(a != null);","class":"lineCov","hits":"1","order":"1731","possible_hits":"1",},
{"lineNum":"  135","line":"    try std.testing.expectEqualStrings(\"a\", a.?.name);","class":"linePartCov","hits":"1","order":"1732","possible_hits":"2",},
{"lineNum":"  136","line":"    try std.testing.expectEqual(Type.Type.Number, a.?.ty.getType());","class":"linePartCov","hits":"1","order":"1733","possible_hits":"2",},
{"lineNum":"  137","line":""},
{"lineNum":"  138","line":"    const b = in.getNamedMember(\"b\");","class":"lineCov","hits":"1","order":"1734","possible_hits":"1",},
{"lineNum":"  139","line":"    try std.testing.expect(b != null);","class":"lineCov","hits":"1","order":"1735","possible_hits":"1",},
{"lineNum":"  140","line":"    try std.testing.expectEqualStrings(\"b\", b.?.name);","class":"linePartCov","hits":"1","order":"1736","possible_hits":"2",},
{"lineNum":"  141","line":"    try std.testing.expectEqual(Type.Type.String, b.?.ty.getType());","class":"linePartCov","hits":"1","order":"1737","possible_hits":"2",},
{"lineNum":"  142","line":""},
{"lineNum":"  143","line":"    const c = in.getNamedMember(\"c\");","class":"lineCov","hits":"1","order":"1738","possible_hits":"1",},
{"lineNum":"  144","line":"    try std.testing.expect(c == null);","class":"lineCov","hits":"1","order":"1740","possible_hits":"1",},
{"lineNum":"  145","line":"}"},
{"lineNum":"  146","line":""},
{"lineNum":"  147","line":"test \"can check if interface assignablility\" {","class":"lineCov","hits":"2","order":"1741","possible_hits":"2",},
{"lineNum":"  148","line":"    const num = Type.newNumber();","class":"lineCov","hits":"1","order":"1742","possible_hits":"1",},
{"lineNum":"  149","line":"    const str = Type.newString();","class":"lineCov","hits":"1","order":"1743","possible_hits":"1",},
{"lineNum":"  150","line":"    const any = Type.newAny();","class":"lineCov","hits":"1","order":"1744","possible_hits":"1",},
{"lineNum":"  151","line":""},
{"lineNum":"  152","line":"    const a = Type.InterfaceType.new(&[_]Type.InterfaceType.Member{","class":"lineCov","hits":"1","order":"1747","possible_hits":"1",},
{"lineNum":"  153","line":"        Type.InterfaceType.Member{ .name = \"a\", .ty = &num },","class":"lineCov","hits":"1","order":"1745","possible_hits":"1",},
{"lineNum":"  154","line":"        Type.InterfaceType.Member{ .name = \"b\", .ty = &str },","class":"lineCov","hits":"1","order":"1746","possible_hits":"1",},
{"lineNum":"  155","line":"    });"},
{"lineNum":"  156","line":""},
{"lineNum":"  157","line":"    const b = Type.InterfaceType.new(&[_]Type.InterfaceType.Member{","class":"lineCov","hits":"1","order":"1751","possible_hits":"1",},
{"lineNum":"  158","line":"        Type.InterfaceType.Member{ .name = \"a\", .ty = &num },","class":"lineCov","hits":"1","order":"1748","possible_hits":"1",},
{"lineNum":"  159","line":"        Type.InterfaceType.Member{ .name = \"b\", .ty = &str },","class":"lineCov","hits":"1","order":"1749","possible_hits":"1",},
{"lineNum":"  160","line":"        Type.InterfaceType.Member{ .name = \"c\", .ty = &any },","class":"lineCov","hits":"1","order":"1750","possible_hits":"1",},
{"lineNum":"  161","line":"    });"},
{"lineNum":"  162","line":""},
{"lineNum":"  163","line":"    const c = Type.InterfaceType.new(&[_]Type.InterfaceType.Member{","class":"lineCov","hits":"1","order":"1754","possible_hits":"1",},
{"lineNum":"  164","line":"        Type.InterfaceType.Member{ .name = \"a\", .ty = &any },","class":"lineCov","hits":"1","order":"1752","possible_hits":"1",},
{"lineNum":"  165","line":"        Type.InterfaceType.Member{ .name = \"b\", .ty = &str },","class":"lineCov","hits":"1","order":"1753","possible_hits":"1",},
{"lineNum":"  166","line":"    });"},
{"lineNum":"  167","line":""},
{"lineNum":"  168","line":"    try std.testing.expect(a.isAssignableTo(a));","class":"lineCov","hits":"1","order":"1755","possible_hits":"1",},
{"lineNum":"  169","line":"    try std.testing.expect(!a.isAssignableTo(b));","class":"lineCov","hits":"1","order":"1762","possible_hits":"1",},
{"lineNum":"  170","line":"    try std.testing.expect(a.isAssignableTo(c));","class":"lineCov","hits":"1","order":"1764","possible_hits":"1",},
{"lineNum":"  171","line":"    try std.testing.expect(b.isAssignableTo(a));","class":"lineCov","hits":"1","order":"1765","possible_hits":"1",},
{"lineNum":"  172","line":"    try std.testing.expect(b.isAssignableTo(b));","class":"lineCov","hits":"1","order":"1766","possible_hits":"1",},
{"lineNum":"  173","line":"    try std.testing.expect(b.isAssignableTo(c));","class":"lineCov","hits":"1","order":"1767","possible_hits":"1",},
{"lineNum":"  174","line":"    try std.testing.expect(!c.isAssignableTo(a));","class":"lineCov","hits":"1","order":"1768","possible_hits":"1",},
{"lineNum":"  175","line":"    try std.testing.expect(!c.isAssignableTo(b));","class":"lineCov","hits":"1","order":"1770","possible_hits":"1",},
{"lineNum":"  176","line":"    try std.testing.expect(c.isAssignableTo(c));","class":"lineCov","hits":"1","order":"1771","possible_hits":"1",},
{"lineNum":"  177","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-13 15:55:52", "instrumented" : 96, "covered" : 96,};
var merged_data = [];
